import { createContext, useContext, useReducer } from "react"

type Status = "idle" | "fetching" | "ready" | "error";

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

interface QuizState {
    question: Question | null,
    gameStatus: Status,
    userAnswer: string | null
};

type QuizAction = 
    { type: "setStatus"; payload: Status } |
    { type: "setQuestion"; payload: Question } |
    { type: "setUserAnswer"; payload: string }

const initialState: QuizState = {
    gameStatus: "idle",
    question: null,
    userAnswer: null
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
            return {...state, question: action.payload};
        case "setStatus":
            return {...state, gameStatus: action.payload};
        case "setUserAnswer":
            return {...state, userAnswer: action.payload};
        default:
            throw new Error("Unknown action");
    }
}