import { useQuiz } from "../../context/QuizContext";
import { decode } from "html-entities";

export default function Result() {
    const { state } = useQuiz();
    
    return (
        <>
            {
                state.userAnswer == state.question?.correct_answer ?
                    <div className="result correct">&#10003; You answered correctly!</div>
                :
                <div className="result incorrect">&#x274C; Your answer is wrong! The correct one was {decode(state.question?.correct_answer)}.</div>
            }
        </>
    );
}
