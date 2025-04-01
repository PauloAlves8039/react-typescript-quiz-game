import AnswerOption from "../Answer/AnswerOption";
import Result from "../Result/Result";
import { useQuiz } from "../../context/QuizContext";
import { decode } from "html-entities";
import "./Game.scss";

export default function Game() {
    const { state, dispatch } = useQuiz();

    function handleSubmit() {
        dispatch({ type: "setStatus", payload: "answered" });
        if (state.userAnswer == state.question?.correct_answer) {
            dispatch({ type: "setScore", payload: "correct" });
        } else {
            dispatch({ type: "setScore", payload: "incorrect" });
        }
    }
    
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{decode(state.question?.question)}</h4>
                <div className="options">
                    {state.question?.incorrect_answers.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>

                {
                    state.userAnswer && state.gameStatus != "answered" &&
                    <button onClick={handleSubmit} >Submit</button>
                }

                {
                    state.gameStatus == "answered" &&
                    <>
                        <Result />
                        <button onClick={() => {dispatch({type: "setStatus", payload: "idle"})}}>Next Question</button>
                    </>
                }

            </div>
        </>
    );
}
