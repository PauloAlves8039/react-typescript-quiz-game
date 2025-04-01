import { createContext, useContext, useReducer } from "react"

type Status = "idle" | "fetching" | "ready" | "error" | "answered";

interface Score {
    correct: number,
    incorrect: number
}

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

interface QuizState {
    question: Question | null,
    gameStatus: Status,
    userAnswer: string | null,
    score: Score
};

type QuizAction = 
    { type: "setStatus"; payload: Status } |
    { type: "setQuestion"; payload: Question } |
    { type: "setUserAnswer"; payload: string | null} |
    { type: "setScore"; payload: "correct" | "incorrect"}

const initialState: QuizState = {
    gameStatus: "idle",
    question: null,
    userAnswer: null,
    score: { correct: 0, incorrect: 0 }
}

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

const QuizContext = createContext<QuizContext>({
    state: initialState,
    dispatch: () => null
});

export function QuizProvider({ children }: { children: React.ReactElement }) {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={{state, dispatch}}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    return useContext(QuizContext);
}

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
        case "setQuestion":
            return { ...state, question: action.payload };
        case "setStatus":
            return { ...state, gameStatus: action.payload };
        case "setUserAnswer":
            return { ...state, userAnswer: action.payload };
        case "setScore":
            return {
                ...state,
                score: {
                    ...state.score,
                    [action.payload]: state.score[action.payload] + 1
                }
            };
        default:
            throw new Error("Unknown action");
    }
}
