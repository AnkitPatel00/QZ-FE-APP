import { contextValue } from "../Context/QuizContext";

const Score = () => {
  const { score } = contextValue();
  return (
    <>
      <h3>Score {score}</h3>
      <button>Main Menu</button>
    </>
  );
};

export default Score;
