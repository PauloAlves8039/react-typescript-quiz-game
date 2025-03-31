import { encode } from "html-entities";
import "./AnswerOption.scss";
import { useQuiz } from "../../context/QuizContext";

export default function AnswerOption({answer}: {answer : string}) {
    const { state, dispatch } = useQuiz();

    return (
      <>
          {
              answer && 
              <div className="answer-option">
                  <p 
                      className={answer == state.userAnswer ? "selected" : ""}
                      onClick={() => {dispatch({type: "setUserAnswer", payload: answer})}}>
                      {encode(answer)}
                  </p>
              </div>
          }

      </>
  );
}
