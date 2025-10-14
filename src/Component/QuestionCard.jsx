import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  gameOverToggle,
  increaseScore,
  increaseQuestionIndex,
} from "../features/question.slice";

const QuestionCard = () => {
  const dispatch = useDispatch();

  const { questions, error, status, score, questionIndex } = useSelector(
    (state) => state.questionsState
  );

  // const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const { question, options, time_limit_seconds, answer, explanation } =
    questions[questionIndex];

  const handleSubmit = () => {
    if (selectedAnswer) {
      if (questions.length - 1 === questionIndex && answer) {
        if (selectedAnswer === answer) {
          dispatch(increaseScore());
        }
        dispatch(gameOverToggle(true));
        setSelectedAnswer("");
        setTimer(30);
        dispatch(increaseQuestionIndex(0));
      } else if (answer && questionIndex < questions.length - 1) {
        if (selectedAnswer === answer) {
          dispatch(increaseScore());
        }
        dispatch(increaseQuestionIndex());
        setSelectedAnswer("");
      }
    }
  };

  const questionNumber = questionIndex + 1;

  return (
    <>
      <div>
        <div className="text-center">
          <span className="display-5">Score: </span>
          <span className="display-5 text-info">{score}</span>
        </div>
        <h3 className="fw-light">
          {questionNumber}.{question}
        </h3>
        {Object.entries(options).map(([key, value]) => {
          return (
            <div className="form-check" key={key}>
              <input
                className="form-check-input"
                checked={selectedAnswer === key}
                type="radio"
                name="options"
                value={key}
                id={key}
                onChange={() => setSelectedAnswer(key)}
              />
              <label className="form-check-label" htmlFor={key}>
                <span className="fw-bold me-2">{key}.</span>
                {value}
              </label>
            </div>
          );
        })}
        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default QuestionCard;
