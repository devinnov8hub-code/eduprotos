"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getQuizById } from "@/app/lib/api/quiz";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { ArrowBigLeft, CheckCircle2, Circle } from "lucide-react";

interface QuizOption {
  id: string;
  option_text: string;
  is_correct: boolean;
  position: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "short_answer";
  position: number;
  quiz_options: QuizOption[];
}

interface Quiz {
  id: string;
  title: string;
  created_at: string;
  quiz_questions: QuizQuestion[];
}

export default function QuizViewPage() {
  const params = useParams();
  const quizId = params.id as string;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      if (!quizId) return;
      
      setLoading(true);
      setError(null);
      
      const { data, error: quizError } = await getQuizById(quizId);
      
      if (quizError) {
        setError(quizError.message || "Failed to load quiz");
        setLoading(false);
        return;
      }
      
      if (!data) {
        setError("Quiz not found");
        setLoading(false);
        return;
      }
      
      // Sort questions by position
      const sortedQuestions = data.quiz_questions
        ? [...data.quiz_questions].sort((a: QuizQuestion, b: QuizQuestion) => a.position - b.position)
        : [];
      
      // Sort options by position for each question
      sortedQuestions.forEach((question) => {
        if (question.quiz_options) {
          question.quiz_options.sort((a: QuizOption, b: QuizOption) => a.position - b.position);
        }
      });
      
      setQuiz({ ...data, quiz_questions: sortedQuestions });
      setLoading(false);
    }

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex w-full bg-white min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex w-full bg-white min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || "Quiz not found"}</p>
            <Link
              href="/courses"
              className="text-[#5955B3] hover:text-[#4b49a0] transition"
            >
              Go back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full bg-white min-h-screen">
      <Sidebar />

      <section className="flex flex-col w-full lg:ml-0 xl:pl-10 xl:pr-10 pl-4 pr-4 pb-6 pt-16 lg:pt-4">
        {/* HEADER */}
        <div className="flex items-center gap-2 mt-4 mb-4">
          <Link href="/courses">
            <ArrowBigLeft className="w-5 h-5 text-black cursor-pointer hover:text-gray-600 transition" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Quiz View</h1>
        </div>

        <main className="bg-gray-50 min-h-[calc(100vh-120px)] w-full rounded-lg p-6">
          {/* QUIZ TITLE */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {quiz.title}
            </h2>
            <p className="text-sm text-gray-500">
              Created on: {new Date(quiz.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* QUESTIONS */}
          <div className="space-y-6">
            {quiz.quiz_questions.length === 0 ? (
              <div className="bg-white border border-gray-300 rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-500">No questions in this quiz yet.</p>
              </div>
            ) : (
              quiz.quiz_questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm"
                >
                  {/* QUESTION HEADER */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-lg font-semibold text-[#5955B3] shrink-0">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {question.question}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                        {question.type === "multiple_choice"
                          ? "Multiple Choice"
                          : "Short Answer"}
                      </span>
                    </div>
                  </div>

                  {/* MULTIPLE CHOICE OPTIONS */}
                  {question.type === "multiple_choice" &&
                    question.quiz_options &&
                    question.quiz_options.length > 0 && (
                      <div className="ml-8 space-y-3">
                        {question.quiz_options.map((option) => (
                          <div
                            key={option.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition ${
                              option.is_correct
                                ? "bg-green-50 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {option.is_correct ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`text-sm ${
                                  option.is_correct
                                    ? "text-green-800 font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                {option.option_text}
                              </p>
                              {option.is_correct && (
                                <span className="inline-block mt-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                                  Correct Answer
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  {/* SHORT ANSWER PLACEHOLDER */}
                  {question.type === "short_answer" && (
                    <div className="ml-8">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 italic">
                          Short answer question - no predefined options
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

