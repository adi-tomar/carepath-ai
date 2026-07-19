import type { Plan } from "./schema";

export const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434/api/chat";
export const DEFAULT_OLLAMA_MODEL = "gemma4:12b";
export const DEFAULT_OLLAMA_TIMEOUT_MS = 300_000;

export interface OllamaConfig {
  url: string;
  model: string;
  timeoutMs: number;
}

export class OllamaError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "OllamaError";
  }
}

export function getOllamaConfig(): OllamaConfig {
  return {
    url: process.env.OLLAMA_URL ?? DEFAULT_OLLAMA_URL,
    model: process.env.OLLAMA_MODEL ?? DEFAULT_OLLAMA_MODEL,
    timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS) || DEFAULT_OLLAMA_TIMEOUT_MS,
  };
}

export async function sendOllamaChat(
  prompt: string,
  config: OllamaConfig = getOllamaConfig(),
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        stream: false,
        think: false,
        options: { temperature: 0.2 },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      let ollamaMessage = "";
      try {
        const payload = (await response.json()) as { error?: unknown };
        ollamaMessage = typeof payload.error === "string" ? payload.error : "";
      } catch {
        // The status code still provides a controlled error when Ollama sends no JSON.
      }

      const modelMissing =
        response.status === 404 || /model.*(not found|required)/i.test(ollamaMessage);
      throw new OllamaError(
        modelMissing
          ? `Ollama model "${config.model}" was not found.`
          : "Ollama could not generate a response.",
        modelMissing ? 404 : response.status,
      );
    }

    let payload: { message?: { content?: unknown } };
    try {
      payload = (await response.json()) as { message?: { content?: unknown } };
    } catch {
      throw new OllamaError("Ollama returned an invalid response.", 502);
    }

    const content = payload.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      throw new OllamaError("Ollama returned an invalid response.", 502);
    }

    return { response: content.trim(), model: config.model };
  } catch (error) {
    if (error instanceof OllamaError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new OllamaError("The Ollama request timed out.", 504);
    }
    if (error instanceof TypeError) {
      throw new OllamaError(
        "Unable to connect to Ollama. Confirm that Ollama is running.",
        503,
      );
    }
    throw new OllamaError("Unable to generate a response from Ollama.", 502);
  } finally {
    clearTimeout(timeout);
  }
}

export async function callOllama(prompt: string, config: OllamaConfig = getOllamaConfig()) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        stream: false,
        think: false,
        options: {
          temperature: 0.2,
          num_predict: 2500,
        },
        format: {
          type: "object",
          additionalProperties: false,
          properties: {
            patientSummary: {
              type: "object",
              additionalProperties: false,
              properties: {
                name: { type: "string", minLength: 1 },
                age: { type: "integer", minimum: 1 },
                context: { type: "string", minLength: 1 },
              },
              required: ["name", "age", "context"],
            },
            tasks: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  id: { type: "string", minLength: 1 },
                  title: { type: "string", minLength: 1 },
                  description: { type: "string", minLength: 1 },
                  timeframe: { type: "string", enum: ["today", "within-48-hours", "this-week", "upcoming"] },
                  priority: { type: "string", enum: ["high", "medium", "low"] },
                  owner: { type: "string", enum: ["patient", "caregiver", "clinic", "care coordinator"] },
                  source: { type: "string", enum: ["provided scenario", "provided care instructions", "coordination suggestion"] },
                  status: { type: "string", enum: ["not started", "in progress", "completed"] },
                  reason: { type: "string", minLength: 1 },
                  changeStatus: { type: "string", enum: ["unchanged", "updated", "new", "removed"] },
                },
                required: [
                  "id",
                  "title",
                  "description",
                  "timeframe",
                  "priority",
                  "owner",
                  "source",
                  "status",
                  "reason",
                  "changeStatus",
                ],
              },
            },
            questionsForCareTeam: { type: "array", items: { type: "string", minLength: 1 } },
            missingInformation: { type: "array", items: { type: "string", minLength: 1 } },
            coordinationRisks: { type: "array", items: { type: "string", minLength: 1 } },
            planChangeSummary: { type: "string", minLength: 1 },
            disclaimer: { type: "string", minLength: 1 },
          },
          required: [
            "patientSummary",
            "tasks",
            "questionsForCareTeam",
            "missingInformation",
            "coordinationRisks",
            "planChangeSummary",
            "disclaimer",
          ],
        },
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const message = response.status === 404 ? "Ollama model not found." : "Ollama request failed.";
      throw new OllamaError(message, response.status);
    }

    const payload = (await response.json()) as { message?: { content?: string } };
    const content = payload.message?.content?.trim();

    if (!content) {
      throw new OllamaError("Ollama returned no message content.");
    }

    return content;
  } catch (error) {
    if (error instanceof OllamaError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new OllamaError("Ollama request timed out.");
    }

    if (error instanceof TypeError) {
      throw new OllamaError("Unable to reach Ollama. Check that the local server is running.");
    }

    throw new OllamaError("Unable to generate a response from Ollama.");
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkOllamaAvailability(config: OllamaConfig = getOllamaConfig()) {
  const baseUrl = config.url.replace(/\/api\/chat\/?$/, "/api");
  const tagsUrl = `${baseUrl}/tags`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(tagsUrl, {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ollamaAvailable: false,
        modelConfigured: false,
        model: config.model,
      };
    }

    const payload = (await response.json()) as { models?: Array<{ name?: string }> };
    const modelConfigured = (payload.models ?? []).some((entry) => entry.name?.includes(config.model));

    return {
      ollamaAvailable: true,
      modelConfigured,
      model: config.model,
    };
  } catch {
    return {
      ollamaAvailable: false,
      modelConfigured: false,
      model: config.model,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function parsePlanResponse(content: string): Plan {
  const parsed = JSON.parse(content) as Plan;
  return parsed;
}
