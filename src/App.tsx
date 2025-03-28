import {useEffect} from "react";
import Game from "./components/Gamer/Game";
import Score from "./components/Score/Score";
import { useQuiz, Question, QuestionsResponse } from "./context/QuizContext";
import FullPageLoader from "./components/Loader/FullPageLoader";
import "./App.scss";

export default function App() {

  const {state, dispatch} = useQuiz();

  async function fetchQuestion() {
    try {
      dispatch({ type: "setStatus", payload: "fetching" });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("https://opentdb.com/api.php?amount=1&category=18");
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let data: QuestionsResponse = await response.json();
      let success: number = 0;
  
      if (data.response_code === success) {
        let question: Question = data.results[0];

        dispatch({ type: "setStatus", payload: "ready" });
        dispatch({ type: "setQuestion", payload: question });
        
      } else {
        dispatch({ type: "setStatus", payload: "error" });
      }
  
    } catch (error) {
      console.log("Error: ", error);
      dispatch({ type: "setStatus", payload: "error" });
    }
  };
  
  useEffect(() => {
    if (state.gameStatus === "idle") {
      fetchQuestion();
    }
  }, [state.gameStatus]); 
  
  return (
    <>
      {
        state.gameStatus == "fetching" ?
          <FullPageLoader /> : state.gameStatus == "error" ?
          <p>Error...</p> : state.gameStatus == "ready" ?
          <>
            <Score />
            <Game /> 
          </> : "" 
      }
    </>
  );
}