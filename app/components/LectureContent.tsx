"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Download, PlusCircle } from "lucide-react";
import CreateLectureModal from "./lectureModal";

export default function CourseContent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [lectures, setLectures] = useState([
    { number: "1", title: "Introduction to the course" },
    { number: "2", title: "Introduction to prepositions" },
  ]);
  

  const toggleLecture = (index: number) => {
    setExpandedIndex(idx => (idx === index ? null : index));
  };

  const handleCreateLecture = (num: string, name: string) => {
    setLectures(prev => [...prev, { number: num, title: name }]);
  };
  

  return (
    <div className="w-full">

      {/* HEADER + BUTTON */}
      <div className="flex items-center w-full mb-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course Content</h1>
          <p className="text-gray-500 text-sm">Manage all lectures</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto flex items-center gap-2 bg-[#5955B3] text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          <PlusCircle className="w-4 h-4" />
          Create lecture
        </button>
      </div>

      {/* LECTURE LIST SECTION */}
      <section className="lectures mt-6 bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Course content</h1>

        {lectures.length === 0 && (
          <p className="text-gray-500">No lectures created yet.</p>
        )}

        <div className="divide-y">
          {lectures.map((lec, index) => (
            <div key={index}>

              {/* collapsible row */}
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleLecture(index)}
              >
                <span className="font-medium text-lg">
                  Lecture {lec.number}: {lec.title}
                </span>

                {expandedIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>

              {/* expanded section */}
              {expandedIndex === index && (
                <div className="bg-gray-50 p-6 flex justify-between items-start">

                  {/* Left content */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5" />
                      <span>{lec.title} PDF</span>
                    </div>

                    <Download className="w-6 h-6 cursor-pointer text-black" />
                  </div>

                  {/* Right buttons */}
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-[#5955B3] text-white rounded-lg flex items-center gap-2">
                      <FileText className="w-5 h-5" /> Upload note
                    </button>

                    <button className="px-4 py-2 bg-[#5955B3] text-white rounded-lg flex items-center gap-2">
                      <PlusCircle className="w-5 h-5" /> Create quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <CreateLectureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateLecture}
      />
    </div>
  );
}
