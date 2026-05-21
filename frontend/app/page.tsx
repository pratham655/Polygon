"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">

        <h1 className="text-2xl font-bold tracking-wide">
          Polygon
        </h1>

        <div className="flex items-center gap-4">

          <SignInButton mode="modal">
            <button className="px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition">
              Sign In
            </button>
          </SignInButton>

          <UserButton />

        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold leading-tight"
        >
          Your Adaptive
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {" "}AI Tutor
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 max-w-2xl text-lg text-gray-300"
        >
          Learn smarter with AI-powered explanations,
          viva training, adaptive quizzes and
          personalized revision experiences.
        </motion.p>

        {/* Hero Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >

          <Link href="/workspace">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-105 transition">
              Start Learning
            </button>
          </Link>

          <Link href="/upload">
            <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
              Upload Notes
            </button>
          </Link>

        </motion.div>

      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-28">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              Smart AI Explanations
            </h2>

            <p className="text-gray-300">
              Learn topics in easy mode, technical mode,
              analogy mode and quick revision mode instantly.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              Adaptive Quizzes
            </h2>

            <p className="text-gray-300">
              Polygon analyzes your understanding and adjusts
              question difficulty dynamically.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              Viva & Placement Prep
            </h2>

            <p className="text-gray-300">
              Practice viva questions, technical interviews,
              HR rounds and confidence-building sessions.
            </p>
          </motion.div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-24">

        <h2 className="text-4xl md:text-5xl font-bold">
          Study Smarter with Polygon
        </h2>

        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Your personal AI tutor designed for students,
          viva preparation, placements and concept mastery.
        </p>

        <Link href="/workspace">
          <button className="mt-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:scale-105 transition">
            Launch Polygon
          </button>
        </Link>

      </section>

    </main>
  );
}