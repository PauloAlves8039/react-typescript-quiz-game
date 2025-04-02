import { createContext, useContext, useReducer } from "react";
import { QuizState } from "../types/quizTypes";
import { QuizAction } from "../types/actionTypes";
import { QuizReducer } from "../context/quizReducer";

const initialState: QuizState = {
    gameStatus: "idle",
    question: null,
    userAnswer: null,
    score: { correct: 0, incorrect: 0 }
};

const QuizContext = createContext<{ state: QuizState; dispatch: React.Dispatch<QuizAction> }>({
    state: initialState,
    dispatch: () => null
});

export function QuizProvider({ children }: { children: React.ReactElement }) {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    return useContext(QuizContext);
}
