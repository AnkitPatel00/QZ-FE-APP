import { useDispatch } from "react-redux";
import { gameAnswerVisible } from "../features/question.slice";
import "../assets/answer.css";

const Answer = ({ answer, explanation, answerVisible }) => {
  const dispatch = useDispatch();

  const handleaAswerVisible = () => {
    dispatch(gameAnswerVisible());
  };

  return (
    <>
      <p>
        <button
          className="btn btn-sm btn-info mt-4"
          type="button"
          onClick={handleaAswerVisible}
          aria-expanded={answerVisible}
          aria-controls="answerPanel"
        >
          See Answer
        </button>
      </p>

      <div
        id="answerPanel"
        className={`answer-wrapper ${answerVisible ? "open" : ""}`}
        aria-hidden={!answerVisible}
      >
        <div className="answer-content card card-body bg-dark">
          <span className="text-info fs-4">{answer}.</span> {explanation}
        </div>
      </div>
    </>
  );
};

export default Answer;
