import React, { useEffect, useRef, useState } from "react";
import { GuessGame } from "../scripts/GuessThePicture";
import gameData from "../data/guess_the_picture.json";

export const GuessThePicture: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [game, setGame] = useState<GuessGame | null>(null);

  useEffect(() => {
    const entry = gameData[0]; // Optionally randomize later
    const image = entry.image_sources[Math.floor(Math.random() * entry.image_sources.length)];

    if (canvasRef.current) {
      const newGame = new GuessGame(image, entry.acceptable_answers, canvasRef.current);
      setGame(newGame);
    }
  }, []);

  const handleGuess = () => {
    if (!game) return;

    const correct = game.guess(guess);
    setResult(correct ? "Correct!" : "Try again!");
    if (correct) setGuess("");
  };

  return (
    <div className="guess-the-picture">
      <canvas ref={canvasRef} style={{ maxWidth: "100%", border: "1px solid #ccc" }} />
      <div>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
      <p>{result}</p>
    </div>
  );
};
