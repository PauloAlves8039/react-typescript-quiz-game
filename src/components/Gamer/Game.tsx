import AnswerOption from "../Answer/AnswerOption";
import Result from "../Result/Result";
import { useQuiz } from "../../context/QuizContext";
import { decode } from "html-entities";
import wonSound from "../../assets/sounds/won.wav";
import lostSound from "../../assets/sounds/lost.wav";
// @ts-ignore
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import "./Game.scss";

export default function Game() {
    const { state, dispatch } = useQuiz();

    let wonAudio = new Audio(wonSound);
    let lostAudio = new Audio(lostSound);

    function handleSubmit(){ 
        dispatch({type:"setStatus", payload: "answered"});
        if (state.userAnswer == state.question?.correct_answer) {
            dispatch({type:"setScore", payload: "correct"});
            wonAudio.play();
            confetti();
        } else {
            dispatch({type:"setScore", payload: "incorrect"});
            lostAudio.play();
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
