"use client";

import React from "react";
import { User, Mail, Lock, BookOpen, Hash } from "lucide-react";
import Image from "next/image";
import logo from "../assets/logo2.png";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { register } from "../lib/api/auth";

export default function Form() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    department: "",
    password: "",
    courseTitle: "",
    courseCode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 1️⃣ Create user in Supabase Auth with metadata
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            department: formData.department,
          },
        },
      }
    );

    if (signUpError) {
      console.error("Signup error:", signUpError);
      alert(signUpError.message);
      return;
    }

    // 2️⃣ Sign in the user immediately after signup
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

    if (signInError) {
      console.error("Sign-in error:", signInError);
      alert(signInError.message);
      return;
    }

    const user = signInData.user;
    if (!user) {
      alert("Could not log in user after signup.");
      return;
    }

    // 3️⃣ Create lecturer profile
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        full_name: formData.name,
        department: formData.department,
      },
    ]);

    if (profileError) {
      console.error("Profile insert error:", profileError);
      alert(profileError.message);
      return;
    }

    // 4️⃣ Insert course
    const { error: courseError } = await supabase.from("courses").insert([
      {
        course_title: formData.courseTitle,
        course_code: formData.courseCode,
        lecturer_id: user.id,
      },
    ]);

    if (courseError) {
      console.error("Course insert error:", courseError);
      alert(courseError.message);
      return;
    }

    // 5️⃣ Navigate to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="w-full h-screen bg-[#5955B3] flex items-center justify-center p-4">
      <section className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-10">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={100}
          className="mb-6"
        />

        <h1 className="text-center text-3xl font-bold text-[#5955B3]">
          Lecturer Registration
        </h1>
        <p className="text-center text-lg text-[#ada9f0] mb-8">
          Create your account to begin teaching
        </p>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* NAME */}
          <div>
            <label className="text-[#5955B3] text-sm">Full Name</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 mt-1">
              <User className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Full Name"
                className="bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[#5955B3] text-sm">email</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 mt-1">
              <Mail className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter email"
                className="bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/*department */}
          <div>
            <label className="text-[#5955B3] text-sm">Department</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 mt-1">
              <Mail className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Department"
                className="bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-[#5955B3] text-sm">Password</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 mt-1">
              <Lock className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="password"
                placeholder="Enter Password"
                className="bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* COURSE TITLE */}
          <div>
            <label className="text-[#5955B3] text-sm">Course Title</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 mt-1">
              <BookOpen className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Course Title"
                className="bg-transparent flex-1 text-gray-700 focus:outline-none"
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
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 mt-1">
              <Hash className="w-5 h-5 text-[#5955B3] mr-3" />
              <input
                type="text"
                placeholder="Enter Course Code"
                className="bg-transparent flex-1 text-gray-700 focus:outline-none"
                value={formData.courseCode}
                onChange={(e) =>
                  setFormData({ ...formData, courseCode: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#5955B3] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#4a48a0] transition"
          >
            Register & Continue
          </button>
        </form>
      </section>
    </div>
  );
}
