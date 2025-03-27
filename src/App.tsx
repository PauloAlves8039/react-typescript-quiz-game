import "./App.scss";
import Game from "./components/Gamer/Game";
import Score from "./components/Score/Score";
import { useQuiz } from "./context/QuizContext";

export default function App() {

  const {state, dispatch} = useQuiz();
  console.log(state);

  return (
    <>
      <Score />
      <Game />
    </>
  );
}