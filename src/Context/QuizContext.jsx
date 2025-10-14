import { createContext, useContext, useEffect, useState } from "react";
import que from "../que";
const myContext = createContext();
const contextValue = () => useContext(myContext);

const QuizContext = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timer === 0) {
      setQuestionIndex((prev) => {
        const next = prev + 1;
        if (next < questions.length) {
          setTimer(30);
          return next;
        } else {
          return prev;
        }
      });
    }
  }, [timer, questions]);

  useEffect(() => {
    let t;
    if (questions.length > 0) {
      t = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      setAnswer("");
      clearInterval(t);
    };
  }, [questionIndex, questions]);

  useEffect(() => {
    if (answer && answer === questions[questionIndex]["answer"]) {
      setScore((prev) => prev + 1);
    }
    if (answer && questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    }
    if (questionIndex === questions.length - 1 && answer) {
      setQuestions([]);
      setQuestionIndex(0);
      setAnswer("");
    }
    setTimer(30);
    return () => {
      setAnswer("");
    };
  }, [answer]);

  const values = {
    question: questions[questionIndex],
    questions,
    timer,
    questionNumber: questionIndex + 1,
    score,
    setAnswer,
    selectedAnswer: answer,
    setQuestions,
  };

  // console.log(questions[questionIndex]["time_limit_seconds"]);

  return <myContext.Provider value={values}>{children}</myContext.Provider>;
};

export default QuizContext;
export { contextValue };
