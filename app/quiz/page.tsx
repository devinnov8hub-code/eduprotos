import { Suspense } from "react";
import QuizClient from "./view/[id]/page";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizClient />
    </Suspense>
  );
}
