import AnswerOption from "../Answer/AnswerOption";
import Result from "../Result/Result";
import { useQuiz } from "../../context/QuizContext";
import { encode } from "html-entities";
import "./Game.scss";

export default function Game() {
    const { state } = useQuiz();
    
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{encode(state.question?.question)}</h4>
                <div className="options">
                    {state.question?.incorrect_answers.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>

                {
                    state.userAnswer &&
                    <button>Submit</button>
                }

                {/* <Result /> */}

            </div>
        </>
    );
}
