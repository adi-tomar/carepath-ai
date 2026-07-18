import { NextResponse } from "next/server";
import { createInitialPlanPrompt, createUpdatedPlanPrompt } from "../../../lib/prompt";
import { planRequestSchema, planSchema } from "../../../lib/schema";
import { callOllama, parsePlanResponse } from "../../../lib/ollama";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedRequest = planRequestSchema.parse(body);

    const prompt = parsedRequest.previousPlan
      ? createUpdatedPlanPrompt(parsedRequest)
      : createInitialPlanPrompt(parsedRequest);

    const content = await callOllama(prompt);
    const parsedPlan = parsePlanResponse(content);
    const validatedPlan = planSchema.parse(parsedPlan);

    return NextResponse.json(validatedPlan);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request or response payload." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to generate a plan right now." },
      { status: 502 },
    );
  }
}
