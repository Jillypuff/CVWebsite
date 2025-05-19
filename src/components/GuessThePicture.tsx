import React, { useEffect, useRef, useState } from "react";
import { GuessGame } from "../scripts/GuessThePicture";
import gameData from "../data/guess_the_picture.json";

export const GuessThePicture: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [game, setGame] = useState<GuessGame | null>(null);

  const startNewGame = () => {
    const entry = gameData[Math.floor(Math.random() * gameData.length)];
    const image = entry.image_sources[Math.floor(Math.random() * entry.image_sources.length)];

    if (canvasRef.current) {
      const newGame = new GuessGame(image, entry.acceptable_answers, canvasRef.current);
      setGame(newGame);
      setGuess("");
      setResult("");
    }
  }

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    if (!game) return;

    const correct = game.guess(guess);
    setResult(correct ? "Correct!" : "Try again!");
    if (correct) setGuess("");
  };

  return (
    <div className="guess-the-picture">
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>

      <div className="controls">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess}>Guess</button>
        <button onClick={startNewGame}>Play Again</button>
      </div>

      <p className="result">{result}</p>
    </div>
  );
};