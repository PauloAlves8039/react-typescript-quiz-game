import { useQuiz } from "../../context/QuizContext";

import "./Score.scss";

export default function Score() {
    const { state } = useQuiz();
    
    return (
        <>
            <div className="score">
                <div>
                    <small>Correct</small>
                    <span className="point">{state.score.correct}</span>
                    <span>X</span>
                    <span className="point">{state.score.incorrect}</span>
                    <small>Incorrect</small>
                </div>
            </div>
        </>
    );
}
