import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  gameOverToggle,
  increaseScore,
  increaseQuestionIndex,
  gameAnswerVisible,
} from "../features/question.slice";
import Answer from "./Answer";

const QuestionCard = () => {
  const dispatch = useDispatch();

  const { questions, error, status, score, questionIndex, answerVisible } =
    useSelector((state) => state.questionsState);

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

  useEffect(() => {
    // reset timer for new question
    setTimer(30); // or your desired starting time per question

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // stop at 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      dispatch(gameAnswerVisible(false));
      clearInterval(interval);
    };
  }, [questionIndex]);

  // Watch timer and move to next question when it hits 0
  useEffect(() => {
    if (timer === 0) {
      if (questionIndex < questions.length - 1) {
        dispatch(increaseQuestionIndex());
      } else {
        dispatch(gameOverToggle(true));
      }
    }
  }, [timer]);

  return (
    <>
      <div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 w-100">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <span className="h5 mb-0 me-2">Time:</span>
            <span
              key={timer} // ensures re-render on each tick
              className="h5 text-info mb-0 bounce"
            >
              {timer}
            </span>
          </div>

          {/* right: score */}
          <div className="d-flex align-items-center">
            <span className="h5 mb-0 me-2 text-md-end">Score:</span>
            <span className="h5 text-info mb-0">{score}</span>
          </div>
        </div>

        <h3 className="fw-light">
          {questionNumber}. {question}
        </h3>

        {Object.entries(options).map(([key, value]) => (
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
        ))}

        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div>
        <Answer
          answer={answer}
          explanation={explanation}
          answerVisible={answerVisible}
        />
      </div>
    </>
  );
};

export default QuestionCard;
