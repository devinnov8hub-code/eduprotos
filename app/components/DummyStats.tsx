"use client";

import React from "react";

export default function DummyStats() {
  return (
    <div className="flex w-full justify-between items-start gap-10 mt-6">
       <div className="flex-1">
         <section className="bg-white p-6 rounded-lg h-100 shadow mt-6">
      <h2 className="text-2xl font-bold mb-2 text-black">The best lessons:</h2>

      <div className="flex items-end gap-6 mt-4 h-70">
        {[
          { title: "Mechanics\nroute", value: 15 },
          { title: "Coding\nc++", value: 30 },
          { title: "Electric\ncircuit", value: 180, highlight: true },
          { title: "Biometric\nmath", value: 50 },
          { title: "Software\ncare", value: 60 },
          { title: "Database\nupdate", value: 78 },
          { title: "Statistics\nmath", value: 52 },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 rounded-t-lg ${
                item.highlight ? "bg-blue-500" : "bg-blue-200"
              }`}
              style={{ height: `${item.value * 1}px` }}
            ></div>
            <p className="text-center text-xs text-gray-600 mt-2 whitespace-pre-line">
              {item.title}
            </p>
          </div>

        ))}
      </div>
    </section>
       </div>

    {/*cIRCULAR STATS*/}

    <div className="flex flex-col items-center gap-10 w-1/4">
        <section className="flex flex-col items-center gap-8 ml-10">
      {/* Circular Stat #1 */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#BFDBFE"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#3B82F6"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={(1 - 0.86) * 283}
            />
          </svg>
          <span className="text-black absolute inset-0 flex items-center justify-center text-3xl font-bold">
            86%
          </span>
        </div>
        <p className="text-sm mt-2 text-black">Course Progress</p>
      </div>

      {/* Circular Stat #2 */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#BFDBFE"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#3B82F6"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={(1 - 0.62) * 283}
            />
          </svg>
          <span className="text-black absolute inset-0 flex items-center justify-center text-3xl font-bold">
            62%
          </span>
        </div>
        <p className="text-sm mt-2 text-black">Students Average</p>
      </div>
    </section>
    </div>
    </div>

    



  );
}
