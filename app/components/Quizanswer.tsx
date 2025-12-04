"use client";

import { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";

// --------------------
// TYPES
// --------------------
export interface QuestionType {
  id: string;                                      // UNIQUE ID REQUIRED
  title: string;
  type: "multiple-choice" | "short-answer";
  options: string[];
  shortAnswer: string;
}

interface QuestionEditorProps {
  question: QuestionType | null;                   // null → show Create button
  index: number;
  onChange: (updated: QuestionType) => void;
  onDelete: () => void;
  onCreate: () => void;
  showCreateButton: boolean;
}

// --------------------
// COMPONENT
// --------------------
export default function QuestionEditor({
  question,
  index,
  onChange,
  onDelete,
  onCreate,
  showCreateButton,
}: QuestionEditorProps) {

  // ---------------------------------------------------------
  // LOCAL STATE (never resets because we store stable values)
  // ---------------------------------------------------------
  const [title, setTitle] = useState(question?.title ?? "");
  const [type, setType] = useState<"multiple-choice" | "short-answer">(
    question?.type ?? "multiple-choice"
  );
  const [options, setOptions] = useState<string[]>(
    question?.options ?? ["Option 1", "Option 2"]
  );
  const [shortAnswer, setShortAnswer] = useState<string>(
    question?.shortAnswer ?? ""
  );

  // ---------------------------------------------------------
  // SYNC WITH PARENT (merge-safe)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!question) return;       // avoid sending data when there is no question yet

    onChange({
      id: question.id,           // retain same ID
      title,
      type,
      options,
      shortAnswer,
    });
  }, [title, type, options, shortAnswer]);

  // ---------------------------------------------------------
  // SHOW CREATE BUTTON ONLY
  // ---------------------------------------------------------
  if (showCreateButton) {
    return (
      <button
        onClick={onCreate}
        className="w-full bg-[#5955B3] text-white py-3 rounded-lg flex items-center justify-center gap-2 mt-4"
      >
        <PlusCircle className="w-5 h-5" />
        Create Question
      </button>
    );
  }

  // ---------------------------------------------------------
  // ADD OPTION
  // ---------------------------------------------------------
  const addOption = () => {
    setOptions((prev) => [...prev, `Option ${prev.length + 1}`]);
  };

  // ---------------------------------------------------------
  // UPDATE option by index
  // ---------------------------------------------------------
  const updateOption = (value: string, i: number) => {
    setOptions((prev) => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });
  };

  // ---------------------------------------------------------
  // DELETE OPTION
  // ---------------------------------------------------------
  const deleteOption = (i: number) => {
    setOptions((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ---------------------------------------------------------
  // MAIN UI
  // ---------------------------------------------------------
  return (
    <div className="border border-[#5955B3] rounded-lg p-5 bg-white w-full shadow-sm">

      {/* HEADER with Question Number and DELETE */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#5955B3] mr-3">
          Question {index + 1}
        </h3>
        <button 
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition ml-auto"
          title="Delete question"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Question Title Input */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Question"
          className="w-full bg-transparent text-gray-800 font-medium text-base focus:outline-none placeholder-gray-400 border-b border-gray-200 pb-2 focus:border-[#5955B3]"
        />
      </div>


      {/* MULTIPLE CHOICE VIEW */}
      {type === "multiple-choice" ? (
        <div className="flex flex-col gap-3 mb-4">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-3">
              <input 
                type="radio" 
                disabled 
                className="w-4 h-4 text-[#5955B3] cursor-not-allowed shrink-0" 
              />
              <input
                type="text"
                value={opt}
                placeholder={`Option ${i + 1}`}
                onChange={(e) => updateOption(e.target.value, i)}
                className="flex-1 bg-transparent border-b border-gray-300 px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#5955B3] placeholder-gray-400"
              />
              {options.length > 2 && (
                <button 
                  onClick={() => deleteOption(i)}
                  className="text-red-500 hover:text-red-700 transition shrink-0"
                  title="Delete option"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          <button
            className="text-sm text-[#5955B3] hover:text-purple-700 flex items-center gap-1 mt-2 font-medium transition w-fit"
            onClick={addOption}
          >
            <PlusCircle className="w-4 h-4" />
            Add Other
          </button>
        </div>
      ) : (
        // -------------------
        // SHORT ANSWER MODE
        // -------------------
        <div className="mb-4">
          <input
            type="text"
            placeholder="Short answer..."
            className="w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-400"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
          />
        </div>
      )}

      {/* BOTTOM SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
        {/* TYPE DROPDOWN */}
        <select
          className="text-sm border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-purple-500 w-full sm:w-auto"
          value={type}
          onChange={(e) =>
            setType(e.target.value as "multiple-choice" | "short-answer")
          }
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="short-answer">Short Answer</option>
        </select>

        {/* REQUIRED TOGGLE */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-gray-600 text-sm">Required</span>
          <div className="relative w-10 h-5 bg-gray-300 rounded-full cursor-pointer transition hover:bg-gray-400">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
