"use client";

import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (lectureNumber: string, lectureName: string) => void;
}

export default function CreateLectureModal({
  isOpen,
  onClose,
  onCreate,
}: ModalProps) {
  const [lectureNumber, setLectureNumber] = useState("");
  const [lectureName, setLectureName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!lectureNumber || !lectureName) return;

    onCreate(lectureNumber, lectureName);
    setLectureNumber("");
    setLectureName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
  <div className="bg-[#EDEBFF] p-6 rounded-lg shadow-lg w-80 border border-black">

    <h2 className="text-xl font-semibold mb-4 text-black">Create Lecture</h2>

    <input
      className="border border-black w-full p-2 rounded mb-3 text-black bg-white"
      placeholder="Lecture Number"
      value={lectureNumber}
      onChange={(e) => setLectureNumber(e.target.value)}
    />

    <input
      className="border border-black w-full p-2 rounded mb-3 text-black bg-white"
      placeholder="Lecture Name"
      value={lectureName}
      onChange={(e) => setLectureName(e.target.value)}
    />

    <div className="flex justify-end gap-3">
      <button
        className="px-4 py-2 bg-red-400 text-black rounded border border-black"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="px-4 py-2 bg-[#5955B3] text-black rounded border border-black"
        onClick={handleSubmit}
      >
        Create
      </button>
    </div>

  </div>
</div>

  );
}
