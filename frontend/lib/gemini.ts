import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askPolygon(
  prompt: string
) {
  try {
    const safePrompt =
      prompt.substring(0, 3000);

    const completion =
      await client.chat.completions.create({
        model:
          "meta-llama/llama-3.1-8b-instruct:free",

        messages: [
          {
            role: "user",
            content: safePrompt,
          },
        ],

        max_tokens: 1000,
      });

    return (
      completion.choices[0].message
        .content || "No response."
    );
  } catch (error: any) {
    console.error(error);

    return JSON.stringify(
      error,
      null,
      2
    );
  }
}