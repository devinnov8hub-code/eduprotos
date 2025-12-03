"use client"

import React, { useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of month
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // Monday-start calendar

  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleSelect = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  const isSelected = (day: number) => {
    return (
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  return (
    <div className="w-120 p-4 bg-white shadow rounded-lg">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-purple-700">
          {currentDate.toLocaleString("default", { month: "short" })} {year}
        </h2>

        <div className="flex gap-2">
          <button onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button onClick={nextMonth}>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* DAYS OF WEEK */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DATES */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i}></div>
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
                ${
                  isSelected(day)
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-purple-100"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
