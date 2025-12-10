"use client";

import { Question } from "../../types";
import { Trash2 } from "lucide-react";

interface QuestionPreviewProps {
  questions: Question[];
  onQuestionSelect?: (index: number) => void;
  currentQuestionIndex?: number | null;
  onDelete?: (index: number) => void;
}

export default function QuestionPreview({ 
  questions, 
  onQuestionSelect,
  currentQuestionIndex,
  onDelete 
}: QuestionPreviewProps) {
  return (
    <div className="w-full">

      {/* EMPTY STATE */}
      {questions.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-base font-medium">No questions yet.</p>
          <p className="text-sm">Create a question to preview.</p>
        </div>
      )}

      {/* QUESTIONS LIST */}
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`mb-5 pb-5 last:mb-0 last:pb-0 border-b last:border-b-0 border-gray-200 cursor-pointer transition ${
            currentQuestionIndex === index ? 'bg-purple-50 -mx-2 px-2 py-2 rounded' : 'hover:bg-gray-50 -mx-2 px-2 py-2 rounded'
          }`}
          onClick={() => onQuestionSelect?.(index)}
        >
          {/* QUESTION NUMBER AND TITLE WITH DELETE */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-sm font-semibold text-gray-800 flex-1">
              {index + 1}. {q.title || `Question ${index + 1}`}
            </h3>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
                className="text-red-500 hover:text-red-700 transition shrink-0"
                title="Delete question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* MULTIPLE CHOICE PREVIEW */}
          {q.type === "multiple_choice" && (
            <div className="flex flex-col gap-2 ml-2">
              {q.options.map((opt, i) => (
                <label 
                  key={i} 
                  className="flex items-start gap-3 text-gray-700 text-sm cursor-pointer p-1 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input 
                    type="radio" 
                    name={`q-${q.id}`}
                    disabled
                    className="w-4 h-4 text-purple-600 cursor-not-allowed mt-0.5 shrink-0"
                  />
                  <span className="text-sm">{opt || `Option ${i + 1}`}</span>
                </label>
              ))}
            </div>
          )}

          {/* SHORT ANSWER PREVIEW */}
          {q.type === "short_answer" && (
            <div className="ml-2">
              <input
                type="text"
                disabled
                className="border-b border-gray-300 bg-transparent w-full sm:w-2/3 p-1 text-gray-600 text-sm"
                placeholder="Short answer"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

        </div>
      ))}

    </div>
  );
}
