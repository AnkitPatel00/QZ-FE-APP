import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";
import { Mosaic } from "react-loading-indicators";

const Question = () => {
  const { questions, error, status } = useSelector(
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
