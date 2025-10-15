import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import que from "../que";
import { contextValue } from "../Context/QuizContext";
import useFetch from "../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../features/question.slice";
import { Mosaic } from "react-loading-indicators";

const Question = () => {
  const dispatch = useDispatch();

  const { questions, error, status, gameOver } = useSelector(
    (state) => state.questionsState
  );

  if (questions.length === 0 || status === "loading") {
    return (
      <>
        <Mosaic
          color="#32cd32"
          size="medium"
          text="Generating Questions..."
          textColor=""
        />
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
