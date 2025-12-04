"use client";

import React, { useEffect } from "react";
import { User, Mail, BookOpen, Hash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo2.png";
import { postCourse, CreateLecturer } from "../lib/api/courses_api";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  lecturer_id: string;
  email: string;
  courseTitle: string;
  courseCode: string;
};
export default function Form() {
  const router = useRouter();

  const [lecturerId, setLecturerId] = React.useState<string>("");

  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    lecturer_id: "",
    email: "",
    courseTitle: "",
    courseCode: "",
  });

  // useEffect(() => {
  //   // Fetch or generate lecturer ID here
  //   const fetchLecturerId = async () => {
  //     // Simulate fetching lecturer ID
  //     // const id = await getLecturerById(1).then((res) => res.data?.id || "");
  //     const profile = await getLecturerById(1); // This must return a UUID, not number 1!

  //     const id = profile.data?.id || "";

  //     // setLecturerId(id);`
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       lecturer_id: id,
  //     }));
  //   };

  //   fetchLecturerId();
  // }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lecturerId = await CreateLecturer(formData.name);

    const response = await postCourse({
      lecturer_id: lecturerId,
      title: formData.courseTitle,
      code: formData.courseCode,
    });

    console.log("Sending:", {
      lecturer_id: lecturerId,
      title: formData.courseTitle,
      code: formData.courseCode,
    });

    if (response.data) {
      console.log("Course added successfully:", response);

      setFormData({
        name: "",
        lecturer_id: "",
        email: "",
        courseTitle: "",
        courseCode: "",
      });
      router.push("/dashboard");
    }
    if (response.error) {
      console.error("Error adding course:", response.error);
    }
  }

  return (
    <div className="w-full h-screen bg-[#5955B3] flex items-center justify-center p-4">
      {/* White Form Card */}
      <section className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-10">
        {/* Title */}
        <Image
          src={logo}
          alt="edu protos logo"
          width={150}
          height={100}
          className="mb-6"
        />
        <h1 className="text-center text-3xl font-bold text-[#5955B3]">
          Welcome Educators
        </h1>
        <h2 className="text-center text-xl  text-[#ada9f0] mt-1 mb-8">
          Enter your details below to begin
        </h2>

        {/* FORM FIELDS */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* NAME */}
          <div>
            <label className="text-[#5955B3] text-sm">Name</label>
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 mt-1">
              <User className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Full Name"
                className="placeholder-[#5955B3] bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* EMAIL */}
          {/* <div>
            <label className="text-[#5955B3] text-sm">Email Address</label>
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 mt-1">
              <Mail className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="email"
                placeholder="Enter Email"
                className="placeholder-[#5955B3] bg-transparent flex-1 text-gray-700 focus:outline-none"
              />
            </div>
          </div> */}

          {/* COURSE TITLE */}
          <div>
            <label className="text-[#5955B3] text-sm">Course Title</label>
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 mt-1">
              <BookOpen className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Course Title"
                className=" placeholder-[#5955B3] bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.courseTitle}
                onChange={(e) =>
                  setFormData({ ...formData, courseTitle: e.target.value })
                }
              />
            </div>
          </div>

          {/* COURSE CODE */}
          <div>
            <label className="text-[#5955B3] text-sm">Course Code</label>
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 mt-1">
              <Hash className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Course Code "
                className=" placeholder-[#5955B3] bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.courseCode}
                onChange={(e) =>
                  setFormData({ ...formData, courseCode: e.target.value })
                }
              />
            </div>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="mt-4 w-full bg-[#5955B3] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#4a48a0] transition"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
