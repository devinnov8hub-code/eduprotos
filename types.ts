export interface Question {
  id: string;  // NEW: Unique identifier
  title: string;
  type: "multiple_choice" | "short_answer";
  options: string[];
  shortAnswer: string;
}
