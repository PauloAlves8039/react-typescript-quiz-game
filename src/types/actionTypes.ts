import { Status } from "./quizTypes";
import { Question } from "./questionTypes";

export type QuizAction =
    | { type: "setStatus"; payload: Status }
    | { type: "setQuestion"; payload: Question }
    | { type: "setUserAnswer"; payload: string | null }
    | { type: "setScore"; payload: "correct" | "incorrect" };
