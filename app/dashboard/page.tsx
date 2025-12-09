"use client"

import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calender";
import StatsCards from "../components/StatsCard";
import DummyStats from "../components/DummyStats";
import RecentNotes from "../components/RecentNotes";
import Image from "next/image";
import { register } from "../lib/api/auth";
import { getCurrentUser } from "../lib/api/auth";
import { useState, useEffect } from "react";

import cartoon from "../assets/images/Group 5.png";
type DashboardProps = {
  name: () => void | string;
};

export default function Dashboard({ name }: DashboardProps) {
  const [userName, setUserName] = useState<string>("Lecturer");

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUserName(user?.user_metadata.full_name || "Lecturer");
    }

    fetchUser();
  }, []);
  return (
    <div className="flex w-full bg-white">
      <Sidebar />

      <section className="flex flex-col w-full lg:ml-0 xl:pl-10 xl:pr-10 pl-4 pr-4 pt-16 lg:pt-4">
        <h1 className="text-3xl font-bold mb-6 mt-4 text-black">Dashboard</h1>
        <main className="bg-gray-50 min-h-screen p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT COLUMN — HERO, STATS CARDS, BAR + CIRCULAR */}
          <section className="flex flex-col gap-6 col-span-1 xl:col-span-2">
            {/* HERO */}
            <div className="box-1 h-50 flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-6 shadow">
              <div>
                <h1 className="text-2xl font-bold text-black">
                  Hello {userName} !
                </h1>
                <p className="text-sm text-gray-500">
                  Here are your teaching tools for today.
                </p>
              </div>
              <Image
                src={cartoon}
                alt="dashboard"
                className="w-66 object-contain"
              />
            </div>

            {/* SMALL STATS */}
            <StatsCards />

            {/* DUMMY STATS (Bar Chart + Circular Charts together) */}
            <div className=" rounded-lg ">
              <DummyStats />
            </div>
          </section>
          {/* RIGHT COLUMN — CALENDAR + RECENT NOTES */}

          <section className="flex flex-col gap-6">
            <div className="">
              <Calendar />
            </div>
            <div className="">
              <RecentNotes />
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}
