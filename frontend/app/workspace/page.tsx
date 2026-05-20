"use client";

import { useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  SendHorizonal,
  BrainCircuit,
  Home,
  LayoutDashboard,
} from "lucide-react";

import { askPolygon } from "../../lib/gemini";

export default function Workspace() {

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {

    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {

      const reply = await askPolygon(
        `
You are Polygon, an advanced AI tutor for students.

Answer in this format:

1. Simple Explanation
2. Technical Explanation
3. Real-world Analogy
4. Important Exam Points

Question:
${question}
`
      );

      setResponse(reply);

    } catch (error) {

      console.error(error);

      setResponse("Something went wrong.");

    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex-col">

        <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Polygon
        </h1>

        <div className="space-y-4">

          <Link href="/">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
              <Home size={20} />
              Home
            </div>
          </Link>

          <Link href="/dashboard">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
              <LayoutDashboard size={20} />
              Dashboard
            </div>
          </Link>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10">
            AI Workspace
          </div>

        </div>

      </aside>

      {/* Main Workspace */}
      <section className="flex-1 flex flex-col">

        {/* Header */}
        <div className="border-b border-white/10 p-6">

          <h2 className="text-3xl font-bold">
            AI Learning Workspace
          </h2>

          <p className="text-gray-400 mt-2">
            Ask Polygon anything and learn deeply.
          </p>

        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* User Question */}
          {question && !loading && (

            <div className="flex justify-end mb-6">

              <div className="max-w-2xl px-6 py-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500">
                {question}
              </div>

            </div>

          )}

          {/* Loading */}
          {loading && (

            <div className="text-gray-400 animate-pulse">
              Polygon is thinking...
            </div>

          )}

          {/* AI Response */}
          {response && (

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >

              {/* AI Icon */}
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <BrainCircuit />
              </div>

              {/* Response */}
              <div className="max-w-4xl rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-6 whitespace-pre-wrap leading-8">

                {response}

              </div>

            </motion.div>

          )}

        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10">

          <div className="max-w-4xl mx-auto flex items-center gap-4 bg-white/10 border border-white/10 rounded-3xl px-6 py-4 backdrop-blur-xl">

            <input
              type="text"
              placeholder="Ask Polygon anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAsk();
                }
              }}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
            />

            <button
              onClick={handleAsk}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center hover:scale-105 transition"
            >
              <SendHorizonal />
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}