import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuestionIndex,
  gameOverToggle,
  increaseScore,
  gameMenuToggle,
} from "../features/question.slice";
import { Player } from "@lottiefiles/react-lottie-player";
import fireworks from "../assets/animation/fireworks.json";
import congratulation from "../assets/animation/congratulation.json";
import starsmile from "../assets/animation/starsmile.json";
import cry from "../assets/animation/cry.json";

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

  let message = "";

  function getAnimation(score) {
    if (score === 10) {
      message = "🎉 Congratulations! You are the best!";
      return fireworks; // fireworks
    } else if (score >= 7) {
      message = "🎉 You are Amazing!";
      return congratulation; // thumbs up
    } else if (score >= 5) {
      message = "👍 Great effort! Keep practicing!";
      return starsmile; // smile
    } else {
      message = "Don’t worry, try again!";
      return cry; // sad face
    }
  }

  return (
    <div className="text-center">
      <div className="d-flex justify-content-center mt-3">
        <Player
          autoplay
          loop
          src={getAnimation(score)}
          style={{ height: "220px", width: "220px" }}
        />
      </div>

      <p className="display-5">
        {score}/{questions.length}
      </p>

      <h3 className="display-6">{message}</h3>

      {/* Custom message */}
      {/* <h4 className="mt-3 text-info">{getMessage(score)}</h4> */}

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
