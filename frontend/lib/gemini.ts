import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askPolygon(
  prompt: string
) {
  return JSON.stringify({
    keyExists: !!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    keyPrefix:
      process.env.NEXT_PUBLIC_OPENROUTER_API_KEY?.substring(
        0,
        15
      ),
  });
}