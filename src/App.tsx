import "./App.scss";
import { useQuiz } from "./context/QuizContext";

export default function App() {

  const state = useQuiz();
  console.log(state);

  return (
    <>
      <div>
        <h1>Quiz Game</h1>
      </div>
    </>
  );
}