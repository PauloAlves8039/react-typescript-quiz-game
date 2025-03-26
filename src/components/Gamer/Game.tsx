import AnswerOption from "../Answer/AnswerOption";
import Result from "../Result/Result";
import "./Game.scss";

const question = {
    "category": "Science: Gadgets",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which buzzword did Apple Inc. use to describe their removal of the headphone jack?",
    "correct_answer": "Courage",
    "incorrect_answers": [
        "Innovation",
        "Revolution",
        "Courage",
        "Bravery"
    ]
};

export default function Game() {
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{question.question}</h4>
                <div className="options">
                    {question.incorrect_answers.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>

                <button>Submit</button>

                <Result />

            </div>
        </>
    );
}
