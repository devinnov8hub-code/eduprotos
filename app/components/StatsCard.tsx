"use client";

import React from "react";
import {  NotebookText, CloudUpload, FileText, School  } from "lucide-react";


export default function StatsCards() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
      <div className="p-4 rounded-lg bg-purple-100 text-center">
  <div className="w-12 h-12 mx-auto bg-purple-200 flex items-center justify-center rounded-full">
    <NotebookText className="w-6 h-6 text-purple-700" />
  </div>
  <div className="text-purple-700 text-3xl font-semibold mt-2">12</div>
  <div className="text-sm text-gray-600">Notes Created</div>
</div>

<div className="p-4 rounded-lg bg-red-100 text-center">
  <div className="w-12 h-12 mx-auto bg-red-200 flex items-center justify-center rounded-full">
    <CloudUpload className="w-6 h-6 text-red-700" />
  </div>
  <div className="text-red-700 text-3xl font-semibold mt-2">24</div>
  <div className="text-sm text-gray-600">Uploaded Resources</div>
</div>

<div className="p-4 rounded-lg bg-blue-100 text-center">
  <div className="w-12 h-12 mx-auto bg-blue-200 flex items-center justify-center rounded-full">
    <FileText className="w-6 h-6 text-blue-700" />
  </div>
  <div className="text-blue-700 text-3xl font-semibold mt-2">8</div>
  <div className="text-sm text-gray-600">Quizzes Generated</div>
</div>

<div className="p-4 rounded-lg bg-orange-100 text-center">
  <div className="w-12 h-12 mx-auto bg-orange-200 flex items-center justify-center rounded-full">
    <School className="w-6 h-6 text-orange-700" />
  </div>
  <div className="text-orange-700 text-3xl font-semibold mt-2">10</div>
  <div className="text-sm text-gray-600">Number of Students</div>
</div>
    </div>
  );
}
