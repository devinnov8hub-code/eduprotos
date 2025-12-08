"use client";
import { useEffect, useState } from "react";
import { getQuizzesByLecture } from "../lib/api/quiz";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Quiz {
  id: string;
  title: string;
  created_at: string;
}

interface LectureQuizzesProps {
  lecture_id: string;
}


export default function LectureQuizzes({ lecture_id }: LectureQuizzesProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchQuizzes() {
      setLoading(true);
      const { data, error } = await getQuizzesByLecture(lecture_id);
      if (error) {
        setError(error.message);
      } else {
        setQuizzes(data || []);
      }
      setLoading(false);
    }

    if (lecture_id) fetchQuizzes();
  }, [lecture_id]);

  if (loading) return <p className="text-gray-500">Loading quizzes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (quizzes.length === 0)
    return <p className="text-gray-500">No quizzes created yet.</p>;

  return (
    <div className="space-y-3 flex m-15">
      {quizzes.map((quiz) => (
        <Link
          key={quiz.id}
          href={`/quiz/view/${quiz.id}`} // change this to your quiz view route
          className="block p-4 border rounded-lg hover:bg-gray-50 transition shadow-sm bg-white"
        >
          <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
          <p className="text-gray-500 text-sm">
            Created on: {new Date(quiz.created_at).toLocaleDateString()}
          </p>
        // </Link>
      ))}
    </div>
  );
}
