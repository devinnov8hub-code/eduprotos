"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronDown, ChevronUp, FileText, Download, PlusCircle } from "lucide-react";
import Link from "next/link";

type LectureFile = { name: string; url: string };
type Lecture = { number: string; title: string; files: LectureFile[] };

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [lectureNumber, setLectureNumber] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");

  const [lectures, setLectures] = useState<Lecture[]>([
    { number: "1", title: "Introduction to the course", files: [] },
    { number: "2", title: "Introduction to prepositions", files: [] },
    { number: "3", title: "History of English", files: [] },
  ]);

  const toggleLecture = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const updateLectureFiles = (index: number, file: LectureFile) => {
  setLectures(prev => {
    const updated = [...prev];
    updated[index].files.push(file);
    return updated;
  });
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
                  ENT 102 – Introduction to English 23
                </h1>
                <p className="text-sm text-gray-500">Lecturer: Dr. Johnson</p>
              </div>

              {/* Button */}
              <button
                onClick={openModal}
                className="ml-auto flex items-center gap-2 bg-[#5955B3] text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
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
                     updateLectureFiles={updateLectureFiles}
                  />
                ))}
              </div>
            </section>
          </section>
        </main>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg border border-[#5955B3]  w-280 h-80">
            <h1 className="text-black text-2xl font-bold pb-8">
              Enter your lecture Number and Title</h1>
            <input
              type="text"
              placeholder="Lecture number"
              className="w-full p-2 border rounded mb-3 text-black placeholder-black"
              value={lectureNumber}
              onChange={(e) => setLectureNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Lecture title"
              className="w-full p-2 border rounded mb-4 text-black placeholder-black"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
            <div className="flex justify-center gap-4 mt-6">
  <button
    className="px-6 py-3 bg-[#5955B3] text-white rounded-lg text-base font-semibold"
    onClick={() => {
      if (lectureNumber && lectureTitle) {
        setLectures([
          ...lectures,
          { number: lectureNumber, title: lectureTitle, files: [] }
        ]);
        setLectureNumber("");
        setLectureTitle("");
        closeModal();
      }
    }}
  >
    Save
  </button>

  <button
    className="px-6 py-3 bg-red-600 text-white rounded-lg text-base font-semibold"
    onClick={closeModal}
  >
    Cancel
  </button>
</div>

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
  lec: Lecture;
  index: number;
  expandedIndex: number | null;
  toggleLecture: (index: number) => void;
  updateLectureFiles: (index: number, file: LectureFile) => void;
}

function LectureRow({ lec, index, expandedIndex, toggleLecture, updateLectureFiles }: LectureRowProps) {
  const isOpen = expandedIndex === index;
  return (
    <div>
      {/* Collapsed Row */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => toggleLecture(index)}
      >
        <span className="font-medium text-lg text-black">
          Lecture {lec.number}: {lec.title}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-black" /> : <ChevronDown className="w-5 h-5 text-black" />}
      </div>
      {/* Expanded Content */}
      {isOpen && (
  <div className="bg-gray-50 p-6 flex justify-between items-start relative min-h-[180px]">

    {/* LEFT CONTENT */}
    <div className="flex flex-col gap-4">

      {/* PDF List */}
      <div className="flex flex-col gap-2">

        {/* If no file uploaded yet */}
        {(!lec.files || lec.files.length === 0) && (
          <div className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-black" />
            <span className="text-black">No notes uploaded yet</span>
          </div>
        )}

        {/* If files exist, list them */}
        {lec.files?.map((file, i: number) => (
          <div key={i} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-black" />
              <span className="text-black">{file.name}</span>
            </div>

            <button onClick={() => window.open(file.url, "_blank")}>
              <Download className="w-6 h-6 text-black cursor-pointer" />
            </button>
          </div>
        ))}

      </div>
    </div>

    {/* RIGHT SIDE BUTTONS — FIXED AT BOTTOM RIGHT */}
    <div className="absolute right-6 bottom-6 flex gap-4">

      {/* Upload PDF BUTTON */}
      <label className="px-4 py-2 bg-[#5955B3] text-white rounded-lg flex items-center gap-2 cursor-pointer">
        <FileText className="w-5 h-5" />
        Upload note
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const fileData = {
              name: file.name,
              url: URL.createObjectURL(file),
            };

            updateLectureFiles(index, fileData);
          }}
        />
      </label>

      {/* Create Quiz BUTTON */}
      <Link href='/quiz'>
      <button className="px-4 py-2 bg-[#5955B3] text-white rounded-lg flex items-center gap-2">
        <PlusCircle className="w-5 h-5" /> Create quiz
      </button>
      </Link>
    </div>

  </div>
)}

    </div>
  );
}
