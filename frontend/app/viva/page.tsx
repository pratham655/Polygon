"use client";

import { useState } from "react";
import Link from "next/link";
import { askPolygon } from "../../lib/gemini";

export default function VivaPage() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [studentAnswer, setStudentAnswer] =
    useState("");
  const [feedback, setFeedback] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  async function startViva() {
    if (!topic.trim()) return;

    setLoading(true);

    try {

      const prompt = `
You are a professional engineering viva examiner.

Topic: ${topic}

Generate:

1. Short topic introduction

2. 10 Viva Questions

3. Detailed Answers

4. Frequently asked examiner questions

5. Important mistakes students make

6. Last-minute revision points

Format clearly.
`;

      const reply =
        await askPolygon(prompt);

      setResponse(reply);

    } catch (error) {

      console.error(error);

      setResponse(
        "Failed to generate viva."
      );
    }

    setLoading(false);
  }

  async function evaluateAnswer() {

    if (
      !topic.trim() ||
      !studentAnswer.trim()
    )
      return;

    setLoading(true);

    try {

      const prompt = `
You are a strict engineering viva examiner.

Topic:
${topic}

Student Answer:
${studentAnswer}

Evaluate:

1. Score out of 10

2. Correct points

3. Missing concepts

4. Better answer

5. Next viva question

Keep it concise.
`;

      const result =
        await askPolygon(prompt);

      setFeedback(result);

    } catch (error) {

      console.error(error);

      setFeedback(
        "Failed to evaluate answer."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-white/10 p-6 flex justify-between items-center">

        <h1 className="text-4xl font-bold">
          🎤 Polygon Viva Trainer
        </h1>

        <Link href="/workspace">
          <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">
            Back
          </button>
        </Link>

      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto p-8">

        {/* Topic Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Enter Topic
          </h2>

          <input
            type="text"
            placeholder="Example: Transistor"
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-black border border-white/10 outline-none"
          />

          <button
            onClick={startViva}
            className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition"
          >
            Generate Viva Questions
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 text-cyan-400">
            Polygon is thinking...
          </div>
        )}

        {/* Viva Content */}
        {response && (

          <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 whitespace-pre-wrap leading-8">

            {response}

          </div>

        )}

        {/* Answer Evaluation */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Practice Your Answer
          </h2>

          <textarea
            placeholder="Type your viva answer here..."
            value={studentAnswer}
            onChange={(e) =>
              setStudentAnswer(
                e.target.value
              )
            }
            rows={6}
            className="w-full p-4 rounded-xl bg-black border border-white/10 outline-none"
          />

          <button
            onClick={evaluateAnswer}
            className="mt-4 px-6 py-3 rounded-xl bg-purple-600 hover:scale-105 transition"
          >
            Evaluate Answer
          </button>

        </div>

        {/* Feedback */}
        {feedback && (

          <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 whitespace-pre-wrap leading-8">

            <h2 className="text-2xl font-bold mb-4">
              Evaluation Result
            </h2>

            {feedback}

          </div>

        )}

      </div>

    </main>
  );
}