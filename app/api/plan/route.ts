import { NextResponse } from "next/server";
import { z } from "zod";
import { createInitialPlanPrompt, createUpdatedPlanPrompt } from "../../../lib/prompt";
import { planRequestSchema, planSchema } from "../../../lib/schema";
import { callOllama, OllamaError, parsePlanResponse } from "../../../lib/ollama";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsedRequest = planRequestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return NextResponse.json(
        { error: "Patient scenario and care instructions are required." },
        { status: 400 },
      );
    }

    const prompt = parsedRequest.data.previousPlan
      ? createUpdatedPlanPrompt(parsedRequest.data)
      : createInitialPlanPrompt(parsedRequest.data);

    const content = await callOllama(prompt);
    let parsedPlan: unknown;
    try {
      parsedPlan = parsePlanResponse(content);
    } catch {
      return NextResponse.json(
        { error: "The local model returned invalid JSON. Please try again." },
        { status: 502 },
      );
    }

    const validatedPlan = planSchema.safeParse(parsedPlan);
    if (!validatedPlan.success) {
      console.warn(
        `Ollama plan validation failed: ${validatedPlan.error.issues
          .map((issue) => `${issue.path.join(".")}:${issue.code}`)
          .join(", ")}`,
      );
      return NextResponse.json(
        { error: "The local model returned an invalid plan. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json(validatedPlan.data);
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request or response payload." },
        { status: 400 },
      );
    }

    if (error instanceof OllamaError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status && error.status >= 400 ? error.status : 502 },
      );
    }

    return NextResponse.json(
      { error: "Unable to generate a plan right now." },
      { status: 502 },
    );
  }
}
