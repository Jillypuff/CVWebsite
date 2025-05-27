import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SortFunction } from "../types/sortingTypes";
import LoadSortingAlgorithms from "../scripts/loadSortingAlogrithms";

const playTone = (value: number, maxValue: number, muted: boolean) => {
  if (muted) return;

  const audioCtx = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  const frequency = 100 + (value / maxValue) * 900;
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  // Staccato envelope
  const now = audioCtx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01); // Quick fade in
  gainNode.gain.linearRampToValueAtTime(0, now + 0.08);   // Quick fade outo
  

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.09);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
    audioCtx.close();
  };
};

const SortingVisualizer: React.FC = () => {
  const [arraySize, setArraySize] = useState(100);
  const [algorithm, setAlgorithm] = useState("");
  const [speed, setSpeed] = useState(30);
  const [steps, setSteps] = useState<number[][]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [algorithms, setAlgorithms] = useState<Record<string, SortFunction>>(
    {}
  );
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const loadAlgos = async () => {
      const algos = await LoadSortingAlgorithms();
      setAlgorithms(algos);
      const defaultAlgo = Object.keys(algos)[0];
      if (defaultAlgo) setAlgorithm(defaultAlgo);
    };

    loadAlgos();
  }, []);

  useEffect(() => {
    reshuffle();
  }, [arraySize]);

  useEffect(() => {
    if (steps.length === 0 || stepIndex >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => prev + 1);
    }, speed);

    if (steps.length > 0 && stepIndex < steps.length - 1) {
      const curr = steps[stepIndex];
      const next = steps[stepIndex + 1];

      for (let i = 0; i < curr.length; i++) {
        if (curr[i] !== next[i]) {
          playTone(next[i], Math.max(...next), muted);
          break;
        }
      }
    }

    return () => clearTimeout(timer);
  }, [stepIndex, steps, speed]);

  const reshuffle = () => {
    const newArr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    setOriginalArray(newArr);
    setSteps([]);
    setStepIndex(0);
  };

  const startSort = () => {
    const sorter = algorithms[algorithm];
    if (!sorter) return;

    const sortSteps = sorter([...originalArray]);
    setSteps(sortSteps);
    setStepIndex(0);
  };

  const currentArray = steps.length > 0 ? steps[stepIndex] : originalArray;
  const maxVal = Math.max(...currentArray);

  return (
    <Container className="text-center mt-4">
      <h2>Sorting Visualizer</h2>

      <Row className="mb-3 justify-content-center">
        <Col xs="auto">
          <Form.Select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            {Object.keys(algorithms).map((key) => (
              <option key={key} value={key}>
                {key[0].toUpperCase() + key.slice(1)} Sort
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs="auto">
          <Form.Control
            type="number"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
          />
        </Col>

        <Col xs="auto">
          <Form.Range
            min="1"
            max="100"
            step="1"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
          <div>Speed: {speed}ms</div>
        </Col>

        <Col xs="auto">
          <Button onClick={reshuffle} variant="warning">
            Reshuffle
          </Button>
        </Col>

        <Col xs="auto">
          <Button onClick={startSort} variant="success">
            Start Sort
          </Button>
        </Col>

        <Col xs="auto">
          <Form.Check
            type="checkbox"
            label="Mute Sound"
            checked={muted}
            onChange={(e) => setMuted(e.target.checked)}
            className="custom-checkbox"
          />
        </Col>
      </Row>

      <div className="visualizer-container">
        {currentArray.map((val, i) => (
          <div
            key={i}
            className="visualizer-bar"
            style={{
              width: `${100 / currentArray.length}%`,
              height: `${(val / maxVal) * 100}%`,
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default SortingVisualizer;
