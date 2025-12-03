"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronDown, ChevronUp, FileText, Download, PlusCircle } from "lucide-react";

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [lectureNumber, setLectureNumber] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");

  const [lectures, setLectures] = useState([
    { number: "1", title: "Introduction to the course" },
    { number: "2", title: "Introduction to prepositions" },
    { number: "3", title: "History of English" },
  ]);

  const toggleLecture = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex w-full  bg-white">
      <Sidebar />

      <section className="flex flex-col w-full xl:pl-10 xl:pr-10 pl-4 pr-4">
        <h1 className="text-3xl font-bold mb-6 mt-4 text-black">Courses</h1>

        <main className="bg-gray-50 min-h-screen p-6 w-full">

          {/* LEFT MAIN COLUMN */}
          <section className="flex flex-col gap-6 col-span-1 xl:col-span-2">

            {/* Header */}
            <div className="flex items-center w-full mb-6">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-black">
                  ENT 102 – Introduction to English 2
                </h1>
                <p className="text-sm text-gray-500">Lecturer: Dr. Johnson</p>
              </div>

              {/* Button */}
              <button
                onClick={openModal}
                className="ml-auto flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
              >
                <PlusCircle className="w-4 h-4" />
                Create lecture
              </button>
            </div>

            {/* COURSE CONTENT */}
            <section className="lectures bg-white p-4 rounded-lg shadow">
              <h1 className="text-black font-bold text-xl mb-4">Course content</h1>

              {lectures.length === 0 && (
                <p className="text-gray-500">No lectures created yet.</p>
              )}

              <div className="divide-y">
                {lectures.map((lec, index) => (
                  <LectureRow
                    key={index}
                    index={index}
                    lec={lec}
                    expandedIndex={expandedIndex}
                    toggleLecture={toggleLecture}
                  />
                ))}
              </div>
            </section>
          </section>
        </main>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <input
              type="text"
              placeholder="Lecture number"
              className="w-full p-2 border rounded mb-3"
              value={lectureNumber}
              onChange={(e) => setLectureNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Lecture title"
              className="w-full p-2 border rounded mb-4"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded mr-2"
              onClick={() => {
                if (lectureNumber && lectureTitle) {
                  setLectures([...lectures, { number: lectureNumber, title: lectureTitle }]);
                  setLectureNumber("");
                  setLectureTitle("");
                  closeModal();
                }
              }}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------
   LECTURE ROW COMPONENT
--------------------------------------------------- */
interface LectureRowProps {
  lec: { number: string; title: string };
  index: number;
  expandedIndex: number | null;
  toggleLecture: (index: number) => void;
}

function LectureRow({ lec, index, expandedIndex, toggleLecture }: LectureRowProps) {
  const isOpen = expandedIndex === index;
  return (
    <div>
      {/* Collapsed Row */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => toggleLecture(index)}
      >
        <span className="font-medium text-lg">
          Lecture {lec.number}: {lec.title}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      {/* Expanded Content */}
      {isOpen && (
        <div className="bg-gray-50 p-6 flex justify-between items-start">
          {/* Left content */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5" />
              <span>{lec.title} PDF</span>
            </div>
            <Download className="w-6 h-6 cursor-pointer" />
          </div>
          {/* Right Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
              <FileText className="w-5 h-5" /> Upload note
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
              <PlusCircle className="w-5 h-5" /> Create quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
