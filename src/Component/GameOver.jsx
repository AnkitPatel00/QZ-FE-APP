import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuestionIndex,
  gameOverToggle,
  increaseScore,
  gameMenuToggle,
} from "../features/question.slice";

const GameOver = () => {
  const dispatch = useDispatch();

  const { questions, error, status, score } = useSelector(
    (state) => state.questionsState
  );

  const handleRestart = () => {
    dispatch(increaseQuestionIndex(0));
    dispatch(gameOverToggle(false));
    dispatch(increaseScore(0));
  };
  const handleNewQuestion = () => {};
  const handleMainMenu = () => {
    dispatch(increaseQuestionIndex(0));
    dispatch(gameOverToggle(false));
    dispatch(increaseScore(0));
    dispatch(gameMenuToggle(true));
  };

  return (
    <div className="text-center">
      <p className="display-5">
        {score}/{questions.length}
      </p>
      <h3>Game Over</h3>
      <button className="btn btn-warning me-2" onClick={handleMainMenu}>
        Main Menu
      </button>
      <button className="btn btn-primary me-2" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default GameOver;
