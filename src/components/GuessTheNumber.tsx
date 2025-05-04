import { useState } from "react";
import "./GuessTheNumber.css";

const GuessTheNumber = () => {
  const [targetNumber, setTargetNumber] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("Enter your guess (1-100)");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const numGuess = parseInt(guess);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numGuess === targetNumber) {
      setMessage(`Correct! You found the number in ${attempts + 1} attempts!`);
      setGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }

    setGuess("");
  };

  const restartGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Enter your guess (1-100)");
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Guess the Number</h1>
      <p className="message">{message}</p>
      <p className="attempts">Attempts: {attempts}</p>

      {!gameOver ? (
        <form onSubmit={handleGuess} className="guess-form">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            min="1"
            max="100"
            className="guess-input"
          />
          <button type="submit" className="guess-button">
            Guess
          </button>
        </form>
      ) : (
        <button onClick={restartGame} className="restart-button">
          Play Again
        </button>
      )}
    </div>
  );
};

export default GuessTheNumber;
