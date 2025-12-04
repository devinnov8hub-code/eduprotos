import { supabase } from "../supabaseClient";

//get courses api
export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      lecturer:lecturer_id(full_name)
    `
    )
  return { data, error };
  };

// export const getLecturers = async () => {
//   const { data, error } = await supabase.from("profiles").select(`
//       *
//     `);
//   return { data, error };
// };

// export const getLecturerById = async (lecturer_id: number | string) => {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select(`*`)
//     .eq("id", lecturer_id)
//     .maybeSingle();
//   return { data, error };
// };

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


export const getCourseById = async (courseId: number) => {
  const { data, error } = await supabase
    .from("courses")
    .select(`*, lecturer:lecturer_id(full_name)`)
    .eq("id", courseId)
    .single();
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

//delete course api
export const deleteCourse = async (courseId: number) => {
  const { data, error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId);
  return { data, error };
};
