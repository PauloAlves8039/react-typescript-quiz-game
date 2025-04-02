import { QuizState } from "../types/quizTypes";
import { QuizAction } from "../types/actionTypes";

export function QuizReducer(state: QuizState, action: QuizAction): QuizState {
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
