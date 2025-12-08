import { supabase } from "../supabaseClient";

//get quiz
export const getQuiz = async () => {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Failed to get quiz:", error);
  }
  return { data, error };
};

//get quiz by id
export async function getQuizById(quizId: number) {
  const { data, error } = await supabase
    .from("quizzes")
    .select(
      `
      *,
      quiz_questions (
        *,
        quiz_options (*)
      )
    `
    )
    .eq("id", quizId)
    .single();

  return { data, error };
}

//Create quiz
export const createQuiz = async (quizName: string, lecture_id: string) => {
  const { data, error } = await supabase
    .from("quizzes")
    .insert([
      {
        title: quizName,
        lecture_id: lecture_id,
        // description: quiz.description,
        // duration: quiz.duration_minutes,
      },
    ])
    .select()
    .single();

  return { data, error };
};

//create question
export async function createQuestion(
  quizId: string,
  question: string,
  position: number,
   type: "multiple-choice" | "short-answer"
) {
  const { data, error } = await supabase
    .from("quiz_questions")
    .insert([{ quiz_id: quizId, question, position, type}])
    .select()
    .single();

  return { data, error };
}

//create option
export async function createOption(
  questionId: string,
  option_text: string,
  is_correct: boolean,
  position: number
) {
  const { data, error } = await supabase
    .from("quiz_options")
    .insert([{ question_id: questionId, option_text, is_correct, position }])
    .select()
    .single();

  return { data, error };
}

//submit quiz
export async function submitQuiz(
  quizId: number,
  student_id: number,
  answers: any[]
) {
  // 1️⃣ Create submission record
  const { data: submission, error: submissionError } = await supabase
    .from("quiz_submissions")
    .insert([{ quiz_id: quizId, student_id }])
    .select()
    .single();

  if (submissionError) return { error: submissionError };

  const submission_id = submission.id;

  // 2️⃣ Insert answers
  const formattedAnswers = answers.map((a) => ({
    submission_id,
    question_id: a.question_id,
    selected_option_id: a.selected_option_id,
  }));

  const { error: answersError } = await supabase
    .from("quiz_answers")
    .insert(formattedAnswers);

  return { data: submission, error: answersError };
}

// delete quiz
export async function deleteQuiz(quizId: number) {
  const { error } = await supabase.from("quizzes").delete().eq("id", quizId);

  return { error };
}

// Get all quizzes for a given lecture
export async function getQuizzesByLecture(lecture_id: string) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lecture_id", lecture_id)
    .order("created_at", { ascending: false });

  return { data, error };
}

