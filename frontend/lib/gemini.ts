import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askPolygon(prompt: string) {

  try {

    const completion = await client.chat.completions.create({

      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

    });

    return completion.choices[0].message.content || "No response.";

  } catch (error) {

    console.error(error);

    return "Something went wrong.";
  }
}