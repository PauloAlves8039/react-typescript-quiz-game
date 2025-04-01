import AnswerOption from "../Answer/AnswerOption";
import Result from "../Result/Result";
import { useQuiz } from "../../context/QuizContext";
import { decode } from "html-entities";
import "./Game.scss";

export default function Game() {
    const { state, dispatch } = useQuiz();
    
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
                    <button onClick={()=>{dispatch({type: "setStatus", payload: "answered"})}}>Submit</button>
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
