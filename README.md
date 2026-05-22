# 🚀 Polygon AI Study Assistant

Polygon AI Study Assistant is an AI-powered educational platform built with Next.js that helps students learn faster through intelligent study tools.

Users can generate:

- 📚 Detailed Study Notes
- 🎤 Viva Questions & Answers
- 📝 Multiple Choice Questions (MCQs)
- 🗂️ Flashcards
- 🤖 AI-Powered Topic Explanations

The platform uses OpenRouter AI models to generate educational content dynamically and Clerk Authentication for secure user access.

---

## 🌟 Features

### 📚 Smart Notes Generator
Generate complete study notes for any engineering or academic topic.

Includes:
- Introduction
- Concepts
- Working Principle
- Advantages
- Disadvantages
- Applications
- Exam Tips
- Revision Notes

---

### 🎤 Viva Preparation

Generate:
- Viva Questions
- Detailed Answers
- Frequently Asked Questions

Perfect for:
- Lab Exams
- Mini Projects
- Viva Voce Preparation

---

### 📝 Quiz Generator

Create:
- MCQs
- Answers
- Explanations

Supports:
- Easy Questions
- Medium Questions
- Advanced Questions

---

### 🗂️ Flashcard Generator

Generate quick revision flashcards for:
- Definitions
- Formulae
- Concepts
- Applications

---

### 🔐 Authentication

Powered by Clerk Authentication:

- Secure Login
- Secure Signup
- Session Management
- Protected Routes

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

### Authentication

- Clerk

### AI

- OpenRouter API
- LLM Integration

### Deployment

- Render

---

## 📂 Project Structure

```bash
frontend/
│
├── app/
│   ├── dashboard/
│   ├── quiz/
│   ├── resume/
│   ├── upload/
│   ├── viva/
│   ├── workspace/
│   └── page.tsx
│
├── components/
│
├── lib/
│   └── gemini.ts
│
├── public/
│
├── middleware.ts
│
└── package.json
```

---

## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/yourusername/polygon.git
```

Navigate:

```bash
cd polygon/frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

CLERK_SECRET_KEY=your_clerk_secret

NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🚀 Production Build

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

---

## 🌐 Deployment

The application is deployed on Render.

Live URL:

```text
https://polygon-iduz.onrender.com/
```

---

## 📈 Future Enhancements

- PDF Notes Upload & Analysis
- AI Resume Builder
- AI Interview Preparation
- Study Planner
- Question Paper Generator
- Voice-Based Learning Assistant
- Personalized Learning Recommendations
- Multi-Language Support

---

## 👨‍💻 Author

Developed by:

**Pratham**

Engineering Student 

---

## 📜 License

This project is developed for educational and learning purposes.

Feel free to use and modify for personal projects.
