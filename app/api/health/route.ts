import { NextResponse } from "next/server";
import { checkOllamaAvailability } from "../../../lib/ollama";

export async function GET() {
  const status = await checkOllamaAvailability();

  return NextResponse.json(status);
}
