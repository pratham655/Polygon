"use client";

import { useState } from "react";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const questions = [
    {
      question: "What is a transistor?",
      options: [
        "Semiconductor device",
        "Resistor",
        "Capacitor",
        "Transformer",
      ],
      answer: 0,
    },
    {
      question: "Which component stores charge?",
      options: [
        "Resistor",
        "Capacitor",
        "Diode",
        "LED",
      ],
      answer: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  function nextQuestion() {
    if (selected === null) return;

    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">
          Quiz Complete 🎉
        </h1>

        <p className="text-2xl mt-6">
          Score: {score}/{questions.length}
        </p>

        <button
          onClick={() => {
            setFinished(false);
            setCurrent(0);
            setScore(0);
            setSelected(null);
          }}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500"
        >
          Retry Quiz
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-8">
        Polygon Quiz 🚀
      </h1>

      {/* Topic */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300">
          Topic
        </label>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Transistor"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
        />
      </div>

      {/* Difficulty */}
      <div className="mb-8">
        <label className="block mb-2 text-gray-300">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Generate Button */}
      <button
        className="mb-10 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500"
      >
        Generate Quiz
      </button>

      {/* Progress */}
      <div className="mb-3">
        Question {current + 1}/{questions.length}
      </div>

      <div className="w-full h-3 bg-zinc-800 rounded mb-8">
        <div
          className="h-3 bg-cyan-500 rounded"
          style={{
            width: `${
              ((current + 1) /
                questions.length) *
              100
            }%`,
          }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-zinc-900 rounded-3xl p-8">

        <h2 className="text-3xl mb-8">
          {questions[current].question}
        </h2>

        <div className="space-y-4">

          {questions[current].options.map(
            (option, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selected === index
                    ? "border-cyan-500 bg-cyan-500/20"
                    : "border-white/10"
                }`}
              >
                {option}
              </button>
            )
          )}

        </div>

        <button
          onClick={nextQuestion}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500"
        >
          Next
        </button>

      </div>

    </main>
  );
}