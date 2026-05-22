"use client";

import { useState } from "react";
import { askPolygon } from "../../lib/gemini";

export default function UploadPage() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(10);

  const [loading, setLoading] =
    useState(false);

  const [aiResponse, setAiResponse] =
    useState("");

  async function askAI(
    type:
      | "summary"
      | "viva"
      | "quiz"
      | "flashcards"
  ) {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    let prompt = "";

    switch (type) {
      case "summary":
        prompt = `
Create complete engineering study notes on:

${topic}

Include:

1. Introduction
2. Definition
3. Working Principle
4. Important Concepts
5. Key Components
6. Advantages
7. Disadvantages
8. Applications
9. Important Formulae (if applicable)
10. Exam Tips
11. Frequently Asked Questions
12. Quick Revision Notes

Use clear headings and student-friendly explanations.
`;
        break;

      case "viva":
        prompt = `
Generate ${count} viva questions with detailed answers on:

${topic}

Requirements:

- Start with basic questions.
- Then intermediate questions.
- Then advanced questions.
- Answers should be easy to understand.
- Include important interview/viva questions.
- Cover different concepts of the topic.

Format:

Question 1:
...

Answer:
...

Continue until ${count} questions are generated.
`;
        break;

     case "quiz":
  prompt = `
Generate exactly ${count} multiple-choice questions (MCQs) on:

${topic}

IMPORTANT RULES:

- DO NOT provide any introduction.
- DO NOT explain the topic.
- DO NOT provide study notes.
- DO NOT provide summaries.
- Start immediately from Question 1.
- Generate exactly ${count} questions.
- Every question must be unique.
- Cover different concepts of ${topic}.
- Include exactly four options:
  A, B, C, D
- Mention the correct answer.
- Give a one-line explanation.
- Stop after Question ${count}.

Format:

Question 1

A) ...
B) ...
C) ...
D) ...

Correct Answer: A

Explanation: ...

Continue until all ${count} questions are completed.
`;
  break;

      case "flashcards":
        prompt = `
Generate ${count} study flashcards on:

${topic}

Requirements:

- Cover definitions.
- Cover important concepts.
- Cover formulas if applicable.
- Cover applications.
- Keep answers concise and easy to memorize.

Format:

Flashcard 1

Question:
...

Answer:
...

Continue until ${count} flashcards are generated.
`;
        break;
    }

    try {
      const result = await askPolygon(
        prompt
      );

      setAiResponse(result);
    } catch (error) {
      console.error(error);

      setAiResponse(
        "Failed to generate AI response."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">
          Polygon AI Study Assistant
        </h1>

        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">

          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Enter Topic (Example: DBMS, Operating System, Machine Learning)"
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              className="bg-black border border-white/20 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) =>
                setCount(
                  Number(e.target.value)
                )
              }
              className="bg-black border border-white/20 rounded-xl px-4 py-3 outline-none"
            />

          </div>

          <div className="flex flex-wrap gap-4 mt-6">

            <button
              onClick={() =>
                askAI("summary")
              }
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition"
            >
              Summary
            </button>

            <button
              onClick={() =>
                askAI("viva")
              }
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              Viva
            </button>

            <button
              onClick={() =>
                askAI("quiz")
              }
              className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition"
            >
              Quiz
            </button>

            <button
              onClick={() =>
                askAI("flashcards")
              }
              className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 transition"
            >
              Flashcards
            </button>

          </div>

        </div>

        {loading && (
          <div className="mt-8 text-cyan-400">
            Polygon is generating content...
          </div>
        )}

        {aiResponse && (
          <div className="mt-8 bg-zinc-900 border border-white/10 rounded-3xl p-6 whitespace-pre-wrap">
            {aiResponse}
          </div>
        )}

      </div>
    </main>
  );
}