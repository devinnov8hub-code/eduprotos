"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Eye, FilePlus2, ArrowBigLeft, PlusCircle } from "lucide-react";
import QuestionEditor from "../components/Quizanswer";
import QuestionPreview from "../components/Seequestion";
import { Question } from "@/types";
import Link from "next/link";
import { createQuestion, createQuiz, createOption } from "../lib/api/quiz";
import { useParams, useSearchParams } from "next/navigation";

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizName, setQuizName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    [key: number]: string;
  }>({});
  const [previewMode, setPreviewMode] = useState(false);
  const searchParams = useSearchParams();
  const lecture_id = searchParams.get("lecture_id") || "";


  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: "",
      type: "multiple-choice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      shortAnswer: "",
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setCurrentQuestionIndex(questions.length);
    // Scroll to top of editor when new question is added
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const updateQuestion = (i: number, updated: Question) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], ...updated };
      return copy;
    });
  };

  const deleteQuestion = (i: number) => {
    // Use functional update to avoid stale closures and ensure
    // currentQuestionIndex is updated based on the new array
    setQuestions((prev) => {
      const newQuestions = prev.filter((_, idx) => idx !== i);

      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex === null) return null;

        // If the deleted question was the currently selected one
        if (prevIndex === i) {
          // If there are still questions, select the previous one (or last available), otherwise null
          return newQuestions.length > 0
            ? Math.min(prevIndex, newQuestions.length - 1)
            : null;
        }

        // If the selected index was after the removed one, shift it left by one
        if (prevIndex > i) return prevIndex - 1;

        return prevIndex;
      });

      return newQuestions;
    });
  };

  const currentQuestion =
    currentQuestionIndex !== null ? questions[currentQuestionIndex] : null;

  //handle create quiz
 const handleCreateQuiz = async () => {
  if (!quizName.trim()) {
    alert("Quiz name is required!");
    return;
  }

  if (!lecture_id) {
    alert("Lecture ID missing — quiz must belong to a lecture");
    return;
  }

  // 1️⃣ Create the quiz
  const { data: quiz, error: quizError } = await createQuiz(quizName, lecture_id);
  if (quizError || !quiz) {
    console.error("Quiz Error:", quizError);
    alert("Error creating quiz");
    return;
  }

  const quizId = quiz.id;
  console.log("Quiz created:", quizId);

  // 2️⃣ Save each question
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Validate question type
    if (q.type !== "multiple-choice" && q.type !== "short-answer") {
      console.error(`Invalid question type at index ${i}:`, q.type);
      continue; // skip invalid question
    }

    if (!q.title.trim()) {
      console.warn(`Skipping empty question at index ${i}`);
      continue;
    }

    // Create question
    const { data: savedQuestion, error: questionError } = await createQuestion(
      quizId,
      q.title,
      i + 1, // position
      q.type // pass correct type
    );

    if (questionError || !savedQuestion) {
      console.error("Question Error:", questionError);
      continue;
    }

    const questionId = savedQuestion.id;

    // 3️⃣ Save options for multiple-choice questions
    if (q.type === "multiple-choice" && q.options?.length > 0) {
      for (let j = 0; j < q.options.length; j++) {
        const opt = q.options[j];
        const correct = selectedAnswer[i] === opt;

        const { error: optionError } = await createOption(
          questionId,
          opt,
          correct,
          j + 1 // option position
        );

        if (optionError) {
          console.error("Option Error:", optionError);
        }
      }
    }
  }

  alert("Quiz created successfully!");
};


  return (
    <div className="flex w-full bg-white min-h-screen">
      <Sidebar />

      <section className="flex flex-col w-full xl:pl-10 xl:pr-10 pl-4 pr-4 pb-6">
        {/* HEADER */}
        <div className="flex items-center gap-2 mt-4 mb-4">
          <Link href="/courses">
            <ArrowBigLeft className="w-5 h-5 text-black cursor-pointer hover:text-gray-600 transition" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Quiz Generator</h1>
        </div>

        <main className="bg-gray-50 min-h-[calc(100vh-120px)] w-full rounded-lg">
          {/* QUIZ CONTAINER - Responsive Layout */}
          <div className="flex flex-col lg:flex-row gap-6 w-full p-4 lg:p-6">
            {/* LEFT SIDE: QUESTION EDITOR */}
            <div className="w-96  flex flex-col gap-4 h-[calc(100vh-220px)] overflow-y-auto pr-3">
              {/* Quiz Name Input */}
              <input
                type="text"
                placeholder="Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 text-sm"
              />

              {/* Question Editor Section */}
              {currentQuestion ? (
                <div className="flex flex-col gap-4">
                  <QuestionEditor
                    key={currentQuestion.id}
                    question={currentQuestion}
                    index={currentQuestionIndex!}
                    onChange={(updated) =>
                      updateQuestion(currentQuestionIndex!, updated)
                    }
                    onDelete={() => deleteQuestion(currentQuestionIndex!)}
                    onCreate={addQuestion}
                    showCreateButton={false}
                  />

                  {/* Answer Selection */}
                  {currentQuestion.type === "multiple-choice" && (
                    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer
                      </label>
                      <select
                        value={selectedAnswer[currentQuestionIndex!] || ""}
                        onChange={(e) =>
                          setSelectedAnswer((prev) => ({
                            ...prev,
                            [currentQuestionIndex!]: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#5955B3] focus:ring-1 focus:ring-purple-200"
                      >
                        <option value="">Select correct answer</option>
                        {currentQuestion.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt || `Option ${i + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Add Question Button */}
                  <button
                    onClick={addQuestion}
                    className="w-full bg-[#5955B3] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[#4b49a0] transition shadow-sm"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add Question
                  </button>

                  {/* Quiz Settings */}
                  <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quiz Settings
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200">
                      <option>Default Settings</option>
                      <option>Timed Quiz</option>
                      <option>Randomize Questions</option>
                      <option>Show Results Immediately</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Empty State - Show create button */}
                  <div className="bg-white border border-gray-300 rounded-lg p-8 text-center shadow-sm">
                    <p className="text-gray-500 mb-4">
                      No questions yet. Create your first question to get
                      started.
                    </p>
                    <button
                      onClick={addQuestion}
                      className="bg-[#5955B3] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[#4b49a0] transition shadow-sm mx-auto"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Create Question
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: PREVIEW */}
            <div className="flex-1">
              <div className="bg-white border border-gray-300 rounded-lg shadow-sm h-full flex flex-col">
                {/* Preview Header with Buttons */}
                <div className="flex items-center justify-end gap-2 p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2 bg-white border border-[#5955B3] text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition font-medium text-sm">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={handleCreateQuiz}
                    className="flex items-center gap-2 bg-[#5955B3] text-white px-4 py-2 rounded-md hover:bg-[#4b49a0] transition font-medium text-sm"
                  >
                    <FilePlus2 className="w-4 h-4" />
                    Create Quiz
                  </button>
                </div>

                {/* Questions Preview List */}
                <div className="flex-1 overflow-y-auto p-4">
                  <QuestionPreview
                    questions={questions}
                    onQuestionSelect={(index) => setCurrentQuestionIndex(index)}
                    currentQuestionIndex={currentQuestionIndex}
                    onDelete={(index) => {
                      deleteQuestion(index);
                      if (currentQuestionIndex === index) {
                        setCurrentQuestionIndex(
                          questions.length > 1 ? Math.max(0, index - 1) : null
                        );
                      } else if (
                        currentQuestionIndex !== null &&
                        currentQuestionIndex > index
                      ) {
                        setCurrentQuestionIndex(currentQuestionIndex - 1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
