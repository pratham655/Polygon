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
    // Increased input size
    const safePrompt = prompt.substring(0, 10000);

    const detailedPrompt = `
You are Polygon AI, an intelligent study assistant.

Provide a comprehensive, structured, and detailed answer.

Requirements:
- Clear Introduction
- Detailed Explanation
- Key Concepts
- Examples
- Advantages
- Disadvantages (if applicable)
- Applications
- Important Exam Points
- Summary

Topic:
${safePrompt}
`;

    const completion =
      await client.chat.completions.create({
        model: "openrouter/auto",

        messages: [
          {
            role: "system",
            content:
              "You are an expert educational AI assistant that provides detailed, accurate, and student-friendly explanations.",
          },
          {
            role: "user",
            content: detailedPrompt,
          },
        ],

        // Increased output length
        max_tokens: 3000,

        temperature: 0.7,
      });

    const message: any =
      completion.choices?.[0]?.message;

    return (
      message?.content ||
      message?.reasoning ||
      "No response generated."
    );

  } catch (error: any) {
    console.error("Polygon AI Error:", error);

    return (
      error?.error?.message ||
      error?.message ||
      "An unexpected error occurred."
    );
  }
}