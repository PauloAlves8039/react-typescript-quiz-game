import { createContext, useContext, useReducer } from "react"

type Status = "idle" | "fetching" | "ready";

interface QuizState {
    gameStatus: Status
};

type QuizAction = 
    { type: "setStatus"; payload: Status };

const initialState: QuizState = {
    gameStatus: "idle"
}

const QuizContext = createContext<QuizState>(initialState);

export function QuizProvider({ children }: { children: React.ReactElement }) {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={state}>
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