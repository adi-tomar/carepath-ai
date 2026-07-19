import { NextResponse } from "next/server";
import { z } from "zod";
import { OllamaError, sendOllamaChat } from "../../../lib/ollama";

const generateRequestSchema = z.object({
  prompt: z.string().trim().min(1, "A prompt is required.").max(10_000),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { prompt } = generateRequestSchema.parse(body);
    const result = await sendOllamaChat(prompt);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof z.ZodError) {
      return NextResponse.json({ error: "Enter a valid prompt." }, { status: 400 });
    }

    if (error instanceof OllamaError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status && error.status >= 400 ? error.status : 502 },
      );
    }

    return NextResponse.json(
      { error: "Unable to generate a response right now." },
      { status: 502 },
    );
  }
}
