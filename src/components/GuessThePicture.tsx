import React, { useEffect, useRef, useState } from "react";
import { GuessGame } from "../scripts/GuessThePicture";
import gameData from "../data/guess_the_picture.json";
import { Dropdown, Button, Form, Row, Col, Container } from "react-bootstrap";

const GuessThePicture: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [game, setGame] = useState<GuessGame | null>(null);
  const [currentEntry, setCurrentEntry] = useState<String>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const startNewGame = () => {
    const filteredData =
      selectedCategory === "all"
        ? gameData
        : gameData.filter((entry) => entry.category === selectedCategory);
    const entry = filteredData[Math.floor(Math.random() * filteredData.length)];
    const image =
      entry.image_sources[
        Math.floor(Math.random() * entry.image_sources.length)
      ];

    setCurrentEntry(entry.name);

    if (canvasRef.current) {
      const newGame = new GuessGame(
        image,
        entry.acceptable_answers,
        canvasRef.current
      );
      setGame(newGame);
      setGuess("");
      setResult("Make a guess!");
    }
  };

  useEffect(() => {
    startNewGame();

    const uniqueCategories = Array.from(
      new Set(gameData.map((entry) => entry.category))
    );
    setCategories(uniqueCategories);
  }, [selectedCategory]);

  const handleGuess = () => {
    if (!game) return;
    if (guess.trim() === "") {
      return;
    }

    const result = game.guess(guess);
    switch (result) {
      case 0:
        setResult("Correct! The answer was " + currentEntry + "!");
        break;
      case 1:
        setResult("Incorrect, try again!");
        break;
      case 2:
        setResult("Game over! The answer was " + currentEntry + "!");
        break;
    }
    setGuess("");
  };

  return (
    <div className="guess-the-picture">
      <div className="d-flex justify-content-center mt-3">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedCategory === "all" ? "All Categories" : selectedCategory}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedCategory("all")}>
              All Categories
            </Dropdown.Item>
            {categories.map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

<div className="container mt-4">
  <div className="row justify-content-center">
    <div className="col-12 col-sm-8 col-md-6 text-center">
      <canvas
        ref={canvasRef}
        width={700}
        height={700}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "auto",
        }}
      />
    </div>
  </div>
</div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuess();
              }}
            >
              <Form.Group className="mb-3" controlId="guessInput">
                <Form.Control
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Enter your guess"
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={handleGuess}>
                  Guess
                </Button>
                <Button variant="secondary" onClick={startNewGame}>
                  Play Again
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs="auto">
            <p className="result">{result}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GuessThePicture;