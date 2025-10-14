import "./App.css";

import GameMenu from "./Component/GameMenu";
import GameOver from "./Component/GameOver";
import Question from "./Component/Questions";
import QuizContext from "./Context/QuizContext";
import { useSelector } from "react-redux";

function App() {
  const { questions, error, status, gameOver, gameMenu } = useSelector(
    (state) => state.questionsState
  );

  return (
    <div className="container">
      <div className="game-container">
        <div>
          {gameMenu && <GameMenu />}
          {gameOver && <GameOver />}
          {!gameOver && !gameMenu && <Question />}
        </div>
      </div>
    </div>
  );
}

export default App;
