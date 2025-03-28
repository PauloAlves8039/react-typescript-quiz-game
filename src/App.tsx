import {useEffect} from "react";
import Game from "./components/Gamer/Game";
import Score from "./components/Score/Score";
import { useQuiz } from "./context/QuizContext";
import "./App.scss";

export default function App() {

  const {state} = useQuiz();
  console.log(state);

  useEffect(() => {
    if(state.gameStatus == "idle"){
      fetchQuestion();
    }
  });

  async function fetchQuestion() {
    const response = await fetch("https://opentdb.com/api.php?amount=1&category=18");
    let data = await(response.json());
    let question = data.results[0];
    console.log("Data",data);
  };

  return (
    <>
      <Score />
      <Game />
    </>
  );
}