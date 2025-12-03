"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

 
export default function RecentNotes () {
     const [openIndex, setOpenIndex] = useState<number | null>(null);
// dummy data for now
      const notes = [
    "Lecture 1: Introduction to the course",
    "Lecture 2: Introduction to prepositions",
    "Lecture 3: History of English",
    "Lecture 4: The movement of vowel",
  ];
    return (
        <div className="w-full bg-white p-4 rounded-lg shadow mt-6">
      <h1 className="text-2xl font-semibold mb-4 text-black">Recents Notes</h1>

      <div className="divide-y border rounded-lg">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {/* Left: Title */}
            <span className="text-black">{note}</span>

            {/* Right: Icon */}
            <ChevronDown
              className={`transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
    );
}