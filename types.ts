export interface Question {
  id: string;  // NEW: Unique identifier
  title: string;
  type: "multiple-choice" | "short-answer";
  options: string[];
  shortAnswer: string;
}
