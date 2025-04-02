import { Question } from "./questionTypes";

export type Status = "idle" | "fetching" | "ready" | "error" | "answered";

export interface Score {
    correct: number;
    incorrect: number;
}

export interface QuizState {
    question: Question | null;
    gameStatus: Status;
    userAnswer: string | null;
    score: Score;
}
