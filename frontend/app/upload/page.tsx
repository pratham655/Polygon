"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { askPolygon } from "../../lib/gemini";

export default function UploadPage() {
  const [fileName, setFileName] =
    useState("");

  const [pdfText, setPdfText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [aiResponse, setAiResponse] =
    useState("");

  const onDrop = useCallback(
  async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0)
      return;

    const file = acceptedFiles[0];

    setFileName(file.name);

    setPdfText(`
Engineering Notes Uploaded

Filename: ${file.name}

These notes are ready for AI processing.

(Polygon V1 Placeholder Content)
`);
  },
  []
);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop,
  });

  async function askAI(
  type: "summary" | "viva" | "quiz" | "flashcards"
) {
  if (!pdfText) {
    alert("No notes loaded.");
    return;
  }

  setLoading(true);

  // HARD LIMIT
  const limitedText = pdfText.substring(0, 2000);

  let prompt = "";

  switch (type) {
    case "summary":
      prompt = `
Summarize these engineering notes:

${limitedText}

Provide:
1. Chapter Summary
2. Important Concepts
3. Key Formulas
4. Exam Tips
`;
      break;

    case "viva":
      prompt = `
Using these notes:

${limitedText}

Generate:
1. 10 Viva Questions
2. Detailed Answers
3. Frequently Asked Questions
`;
      break;

    case "quiz":
      prompt = `
Create 10 MCQs from:

${limitedText}

Format:

Question
A)
B)
C)
D)

Correct Answer
`;
      break;

    case "flashcards":
      prompt = `
Create study flashcards from:

${limitedText}

Format:

Question:
Answer:
`;
      break;
  }

  console.log(
    "Prompt length:",
    prompt.length
  );

  try {
    const result = await askPolygon(prompt);

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
          Upload Notes
        </h1>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-cyan-500 rounded-3xl p-16 text-center cursor-pointer hover:bg-white/5 transition"
        >
          <input {...getInputProps()} />

          <p className="text-xl">
            Drag & Drop PDF Here
          </p>

          <p className="mt-4 text-gray-400">
            or click to browse
          </p>

        </div>

        {fileName && (
          <div className="mt-6 p-4 rounded-xl bg-white/10">
            Uploaded: {fileName}
          </div>
        )}

        {fileName && (
          <div className="flex flex-wrap gap-4 mt-6">

            <button
              onClick={() =>
                askAI("summary")
              }
              className="px-5 py-3 rounded-xl bg-cyan-600"
            >
              Summary
            </button>

            <button
              onClick={() =>
                askAI("viva")
              }
              className="px-5 py-3 rounded-xl bg-purple-600"
            >
              Viva
            </button>

            <button
              onClick={() =>
                askAI("quiz")
              }
              className="px-5 py-3 rounded-xl bg-green-600"
            >
              Quiz
            </button>

            <button
              onClick={() =>
                askAI("flashcards")
              }
              className="px-5 py-3 rounded-xl bg-orange-600"
            >
              Flashcards
            </button>

          </div>
        )}

        {loading && (
          <div className="mt-8 text-cyan-400">
            Polygon is analyzing...
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