import { createContext, useContext, useReducer } from "react"

type Status = "idle" | "fetching" | "ready";

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

interface QuizState {
    gameStatus: Status
};

type QuizAction = 
    { type: "setStatus"; payload: Status };

const initialState: QuizState = {
    gameStatus: "idle"
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
        case "setStatus":
            return {...state, gameStatus: action.payload};
        default:
            throw new Error("Unknown action");
    }
}