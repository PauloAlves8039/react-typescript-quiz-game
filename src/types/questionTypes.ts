export interface Question {
    category: string;
    type: "multiple" | "boolean";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuestionsResponse {
    response_code: number;
    results: Question[];
}
