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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">

        <h2 className="text-xl font-semibold mb-4">Create Lecture</h2>

        <input
          className="border w-full p-2 rounded mb-3"
          placeholder="Lecture Number"
          value={lectureNumber}
          onChange={(e) => setLectureNumber(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded mb-3"
          placeholder="Lecture Name"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
}
