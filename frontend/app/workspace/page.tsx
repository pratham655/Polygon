"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  SendHorizonal,
  Home,
  LayoutDashboard,
} from "lucide-react";

import { askPolygon } from "../../lib/gemini";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Workspace() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<
    "easy" | "technical" | "revision" | "viva"
  >("easy");

 const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  const saved = localStorage.getItem(
    "polygon-chat"
  );

  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

  useEffect(() => {
    localStorage.setItem(
      "polygon-chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  async function handleAsk() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    const prompts = {
      easy: `
Explain in simple language.
Use examples and analogies.
Avoid difficult terminology.
`,

      technical: `
Explain in technical engineering detail.
Include concepts, formulas,
applications and exam relevance.
`,

      revision: `
Provide short revision notes.
Include only key points.
Make it exam-oriented.
`,

      viva: `
Act as a viva examiner.

Provide:
1. Brief explanation
2. Viva questions
3. Model answers
4. Follow-up questions
`,
    };

    try {
      const reply = await askPolygon(`
You are Polygon AI Tutor.

Mode:
${prompts[mode]}

Question:
${currentQuestion}
`);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while generating the response.",
        },
      ]);
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

  <Link href="/upload">
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
      Upload Notes
    </div>
  </Link>
  <Link href="/viva">
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
    Viva Practice
  </div>
</Link>
 <Link href="/quiz">
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
    Quiz Mode
  </div>
</Link>
<Link href="/resume">
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
    Resume Analyzer
  </div>
</Link>

  <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10">
    AI Workspace
  </div>

</div>

      </aside>

      {/* Main Area */}
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

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-4xl px-6 py-4 rounded-3xl leading-8 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "bg-white/10 border border-white/10"
                }`}
              >

                {msg.role === "assistant" ? (
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}

              </div>

            </div>

          ))}

          {loading && (
            <div className="text-gray-400 animate-pulse">
              Polygon is thinking...
            </div>
          )}

        </div>

        {/* Bottom Input */}
        <div className="p-6 border-t border-white/10">

          {/* Learning Modes */}
          <div className="max-w-4xl mx-auto mb-4 flex flex-wrap gap-3">

            <button
              onClick={() => setMode("easy")}
              className={`px-4 py-2 rounded-xl ${
                mode === "easy"
                  ? "bg-green-500"
                  : "bg-white/10"
              }`}
            >
              Easy
            </button>

            <button
              onClick={() => setMode("technical")}
              className={`px-4 py-2 rounded-xl ${
                mode === "technical"
                  ? "bg-blue-500"
                  : "bg-white/10"
              }`}
            >
              Technical
            </button>

            <button
              onClick={() => setMode("revision")}
              className={`px-4 py-2 rounded-xl ${
                mode === "revision"
                  ? "bg-purple-500"
                  : "bg-white/10"
              }`}
            >
              Revision
            </button>

            <button
              onClick={() => setMode("viva")}
              className={`px-4 py-2 rounded-xl ${
                mode === "viva"
                  ? "bg-orange-500"
                  : "bg-white/10"
              }`}
            >
              Viva
            </button>

          </div>

          {/* Input Box */}
          <div className="max-w-4xl mx-auto flex items-center gap-4 bg-white/10 border border-white/10 rounded-3xl px-6 py-4 backdrop-blur-xl">

            <input
              type="text"
              placeholder={`Ask Polygon in ${mode} mode...`}
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
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