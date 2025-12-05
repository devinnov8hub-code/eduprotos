import { supabase } from "../supabaseClient";

//get courses api
export const getCourses = async () => {
  const { data, error } = await supabase.from("courses").select(
    `
      *,
      lecturer:lecturer_id(full_name)
    `
  );
  return { data, error };
};

export async function CreateLecturer(name: string) {
  // Check if a profile already exists
  let { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .eq("full_name", name)
    .single();

  if (existing) return existing.id;

  // If not found, create a new lecturer
  const { data: newProfile, error } = await supabase
    .from("profiles")
    .insert([{ full_name: name }])
    .select()
    .single();

  if (error) throw error;

  return newProfile.id;
}

// Get courses for the logged-in lecturer
export const getCoursesByLecturerId = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) return { data: null, error: new Error("User not logged in") };

  const { data, error } = await supabase
    .from("courses")
    .select("id, course_title, course_code, lecturer_id(full_name)") // make sure 'lecturer_id' is the FK column
    .eq("lecturer_id", user.id);

  return { data, error };
};

export const postCourse = async (course: {
  title: string;
  code: string;
  lecturer_id?: string;
}) => {
  const { data, error } = await supabase.from("courses").insert([
    {
      course_title: course.title,
      course_code: course.code,
      lecturer_id: course.lecturer_id,
      // name: course.profiles?.full_name,
    },
  ]);
  return { data, error };
};

// getLectures api
export const getlectures = async () => {
  const { data, error } = await supabase.from("lectures").select("*");
  return { data, error };
};

//create lecture api
export const createLecture = async (lecture: {
  lecture_no: number;
  title: string;
  quiz?: string;
  course_id?: string;
}) => {
  const { data, error } = await supabase
    .from("lectures")
    .insert([
      {
        lecture_no: lecture.lecture_no,
        title: lecture.title,
        course_id: lecture.course_id,
      },
    ])
    .select()
    .single();
  return { data, error };
};

//delete course api
export const deleteCourse = async (courseId: number) => {
  const { data, error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId);
  return { data, error };
};
