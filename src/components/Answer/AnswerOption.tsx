import "./AnswerOption.scss";

export default function AnswerOption({answer}: {answer : string}) {
  return (
      <>
          {
              answer &&
              <div className="answer-option">
                  <p>
                      {answer}
                  </p>
              </div>
          }

      </>
  );
}
