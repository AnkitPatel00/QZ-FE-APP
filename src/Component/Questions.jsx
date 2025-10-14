import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import que from "../que";
import { contextValue } from "../Context/QuizContext";
import useFetch from "../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../features/question.slice";

const Question = () => {
  const dispatch = useDispatch();

  const { questions, error, status, gameOver } = useSelector(
    (state) => state.questionsState
  );

  // useEffect(() => {

  // }, []);

  if (questions.length === 0 || status === "loading") {
    return (
      <>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {questions.length > 0 && (
        <div>
          <QuestionCard />
        </div>
      )}
    </div>
  );
};
export default Question;
