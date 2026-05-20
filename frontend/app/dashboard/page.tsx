"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Upload,
  BookOpen,
  GraduationCap,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 hidden md:flex flex-col">

        <h1 className="text-3xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Polygon
        </h1>

        <nav className="space-y-6">

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition cursor-pointer">
            <Brain size={22} />
            <span>AI Tutor</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition cursor-pointer">
            <Upload size={22} />
            <span>Upload Notes</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition cursor-pointer">
            <BookOpen size={22} />
            <span>Revision</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition cursor-pointer">
            <GraduationCap size={22} />
            <span>Viva Practice</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition cursor-pointer">
            <BarChart3 size={22} />
            <span>Progress</span>
          </div>

        </nav>

      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-2">
              Continue your AI-powered learning journey.
            </p>
          </div>

          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-105 transition">
            New Session
          </button>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Upload Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-8 bg-white/10 border border-white/10 backdrop-blur-xl"
          >
            <Upload className="mb-6 text-cyan-400" size={40} />

            <h3 className="text-2xl font-bold mb-3">
              Upload Notes
            </h3>

            <p className="text-gray-400">
              Upload PDFs, notes, or study material and let Polygon
              teach you intelligently.
            </p>
          </motion.div>

          {/* Quiz Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-8 bg-white/10 border border-white/10 backdrop-blur-xl"
          >
            <Brain className="mb-6 text-purple-400" size={40} />

            <h3 className="text-2xl font-bold mb-3">
              Adaptive Quiz
            </h3>

            <p className="text-gray-400">
              Test your understanding with dynamic AI-generated
              questions and instant feedback.
            </p>
          </motion.div>

          {/* Viva Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-8 bg-white/10 border border-white/10 backdrop-blur-xl"
          >
            <GraduationCap
              className="mb-6 text-pink-400"
              size={40}
            />

            <h3 className="text-2xl font-bold mb-3">
              Viva Practice
            </h3>

            <p className="text-gray-400">
              Simulate oral exams, interviews, and technical viva
              sessions with AI.
            </p>
          </motion.div>

        </div>

        {/* Progress Section */}
        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          {/* Progress Card */}
          <div className="rounded-3xl p-8 bg-white/10 border border-white/10 backdrop-blur-xl">

            <h3 className="text-2xl font-bold mb-6">
              Learning Progress
            </h3>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Physics</span>
                  <span>78%</span>
                </div>

                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-cyan-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Electronics</span>
                  <span>62%</span>
                </div>

                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-purple-400 rounded-full" />
                </div>
              </div>

            </div>
          </div>

          {/* Recent Topics */}
          <div className="rounded-3xl p-8 bg-white/10 border border-white/10 backdrop-blur-xl">

            <h3 className="text-2xl font-bold mb-6">
              Recent Topics
            </h3>

            <div className="space-y-4">

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                Zener Diode Characteristics
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                Differential Equations
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                Signal Processing Basics
              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}