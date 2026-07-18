import type { Plan } from "./schema";

export const DEFAULT_OLLAMA_URL = "http://localhost:11434/api/chat";
export const DEFAULT_OLLAMA_MODEL = "gemma4:12b";

export interface OllamaConfig {
  url: string;
  model: string;
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
  };
}

export async function callOllama(prompt: string, config: OllamaConfig = getOllamaConfig()) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);

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
        temperature: 0.2,
        format: {
          type: "object",
          properties: {
            patientSummary: {
              type: "object",
              properties: {
                name: { type: "string" },
                age: { type: "number" },
                context: { type: "string" },
              },
              required: ["name", "age", "context"],
            },
            tasks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  timeframe: { type: "string" },
                  priority: { type: "string" },
                  owner: { type: "string" },
                  source: { type: "string" },
                  status: { type: "string" },
                  reason: { type: "string" },
                  changeStatus: { type: "string" },
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
            questionsForCareTeam: { type: "array", items: { type: "string" } },
            missingInformation: { type: "array", items: { type: "string" } },
            coordinationRisks: { type: "array", items: { type: "string" } },
            planChangeSummary: { type: "string" },
            disclaimer: { type: "string" },
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
  const timeout = window.setTimeout(() => controller.abort(), 5000);

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
