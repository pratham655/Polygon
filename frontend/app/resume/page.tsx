"use client";

import { useState } from "react";
import { askPolygon } from "../../lib/gemini";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [improvedResume, setImprovedResume] =
    useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeResume() {
    if (!resumeText.trim()) return;

    setLoading(true);

    try {
      const prompt = `
You are an ATS Resume Analyzer.

Target Role:
${targetRole || "General Software Engineer"}

Resume:
${resumeText}

Provide:

1. ATS Score (/100)

2. Technical Skills Found

3. Missing Skills

4. Strengths

5. Weaknesses

6. Improvement Suggestions

Format clearly using headings and bullet points.
`;

      const result = await askPolygon(prompt);

      setAnalysis(result);
    } catch (error) {
      console.error(error);

      setAnalysis(
        "Failed to analyze resume."
      );
    }

    setLoading(false);
  }

  async function improveResume() {
    if (!resumeText.trim()) return;

    setLoading(true);

    try {
      const prompt = `
You are an expert resume writer.

Target Role:
${targetRole || "General Software Engineer"}

Rewrite and improve this resume.

Requirements:

- ATS friendly
- Professional wording
- Strong project descriptions
- Better action verbs
- Better achievements
- Better summary section
- Keep information realistic

Resume:

${resumeText}
`;

      const result =
        await askPolygon(prompt);

      setImprovedResume(result);
    } catch (error) {
      console.error(error);

      setImprovedResume(
        "Failed to improve resume."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Resume Analyzer 🚀
        </h1>

        <p className="text-gray-400 mb-8">
          Analyze and improve your resume using Polygon AI
        </p>

        {/* Target Role */}
        <div className="mb-6">

          <label className="block mb-2 text-gray-300">
            Target Job Role
          </label>

          <input
            type="text"
            value={targetRole}
            onChange={(e) =>
              setTargetRole(e.target.value)
            }
            placeholder="Example: Data Analyst, ML Engineer, Software Developer"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

        </div>

        {/* Resume Text */}
        <div className="mb-6">

          <label className="block mb-2 text-gray-300">
            Resume Content
          </label>

          <textarea
            rows={15}
            value={resumeText}
            onChange={(e) =>
              setResumeText(e.target.value)
            }
            placeholder="Paste your resume here..."
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={analyzeResume}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition"
          >
            Analyze Resume
          </button>

          <button
            onClick={improveResume}
            className="px-6 py-3 rounded-xl bg-green-600 hover:scale-105 transition"
          >
            Generate Better Resume
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mb-6 text-cyan-400 animate-pulse">
            Polygon is analyzing...
          </div>
        )}

        {/* Analysis */}
        {analysis && (

          <div className="mb-8 bg-zinc-900 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              ATS Analysis
            </h2>

            <div className="whitespace-pre-wrap leading-8">
              {analysis}
            </div>

          </div>

        )}

        {/* Improved Resume */}
        {improvedResume && (

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Improved Resume
            </h2>

            <div className="whitespace-pre-wrap leading-8">
              {improvedResume}
            </div>

          </div>

        )}

      </div>

    </main>
  );
}