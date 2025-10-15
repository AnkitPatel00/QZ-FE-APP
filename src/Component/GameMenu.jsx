import { useDispatch } from "react-redux";
import { gameMenuToggle, getQuestions } from "../features/question.slice";
import { useState } from "react";
import { TrophySpin } from "react-loading-indicators";

const GameMenu = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("fullstack");
  const [difficulty, setDifficulty] = useState("easy");

  const handleGameStart = () => {
    dispatch(gameMenuToggle(false));
    dispatch(getQuestions({ category, difficulty }));
  };

  console.log(difficulty);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <TrophySpin color="#32cd32" size="medium" text="" textColor="" />
      </div>
      <h2 className="my-3 display-5">MernStack Quiz App</h2>
      <label>Topics</label>
      <div className="d-flex justify-content-center mb-3">
        <select
          className="form-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="fullstack">Fullstack</option>
          <option value="react">React</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <p>Difficulty</p>
      <div className="d-flex  mb-3">
        <div className="form-check  me-2">
          <input
            checked={difficulty === "easy"}
            className="form-check-input"
            value="easy"
            id="easy"
            type="radio"
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <label className="form-check-label" htmlFor="easy">
            Easy
          </label>
        </div>
        <div className="form-check  me-2">
          <input
            checked={difficulty === "medium"}
            className="form-check-input"
            value="medium"
            id="medium"
            type="radio"
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <label className="form-check-label" htmlFor="medium">
            Medium
          </label>
        </div>
        <div className="form-check  me-2">
          <input
            checked={difficulty === "hard"}
            className="form-check-input"
            value="hard"
            id="hard"
            type="radio"
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <label className="form-check-label" htmlFor="hard">
            Hard
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-warning " onClick={handleGameStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
