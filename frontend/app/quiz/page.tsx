"use client";

import { useState } from "react";
import { askPolygon } from "../../lib/gemini";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  async function generateQuiz() {
    if (!topic.trim()) {
      alert("Enter a topic");
      return;
    }

    setLoading(true);

    const prompt = `
Generate ${count} MCQ questions.

Topic:
${topic}

Difficulty:
${difficulty}

Format:

Question

A)
B)
C)
D)

Correct Answer
`;

    try {
      const response =
        await askPolygon(prompt);

      setResult(response);

    } catch (error) {
      console.error(error);

      setResult(
        "Failed to generate quiz."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          Quiz Generator
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

          <input
            type="number"
            value={count}
            min={1}
            max={100}
            onChange={(e) =>
              setCount(
                Number(e.target.value)
              )
            }
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button
            onClick={generateQuiz}
            className="px-6 py-3 rounded-xl bg-cyan-600"
          >
            Generate Quiz
          </button>

        </div>

        {loading && (
          <p className="mt-8">
            Generating quiz...
          </p>
        )}

        {result && (
          <div className="mt-8 bg-zinc-900 p-6 rounded-3xl whitespace-pre-wrap">
            {result}
          </div>
        )}

      </div>

    </main>
  );
}