import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  PhysicsSimulation,
  SimulationConfig,
} from "../scripts/physics/simulation";
import { Vector2D } from "../scripts/physics/vector2d";
import { Ball } from "../scripts/physics/ball";
import { Obstacle } from "../scripts/physics/obstacle";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

const DEFAULT_CANVAS_SIZE = 500;
const MOBILE_CANVAS_SIZE = 320;

const Bounce: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<PhysicsSimulation | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const [gravityY, setGravityY] = useState(0.0);
  const [restitution, setRestitution] = useState(1.0);
  const [ballRadius, setBallRadius] = useState(10);
  const [numObstacles, setNumObstacles] = useState(3);
  const [worldFriction, setWorldFriction] = useState(0.0);

  const [canvasSize, setCanvasSize] = useState(DEFAULT_CANVAS_SIZE);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setCanvasSize(MOBILE_CANVAS_SIZE);
      } else if (window.innerWidth < 600) {
        setCanvasSize(360);
      } else {
        setCanvasSize(DEFAULT_CANVAS_SIZE);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initialConfig: SimulationConfig = {
      gravity: new Vector2D(0, gravityY),
      restitution: restitution,
      canvasWidth: canvasSize,
      canvasHeight: canvasSize,
      worldFriction: worldFriction,
    };
    simulationRef.current = new PhysicsSimulation(initialConfig);
    generateObstacles(numObstacles);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [canvasSize]);

  useEffect(() => {
    if (simulationRef.current) {
      simulationRef.current.updateConfig({
        gravity: new Vector2D(0, gravityY),
        restitution: restitution,
        worldFriction: worldFriction,
        canvasWidth: canvasSize,
        canvasHeight: canvasSize,
      });
    }
  }, [gravityY, restitution, worldFriction, canvasSize]);

  const generateObstacles = useCallback(
    (count: number) => {
      if (!simulationRef.current) return;
      simulationRef.current.clearObstacles();

      const obstacleMinHeight = 20;
      const obstacleMaxHeight = 60;
      const obstacleMinWidth = 40;
      const obstacleMaxWidth = 100;
      const spacing = 10;

      for (let i = 0; i < count; i++) {
        let attempts = 0;
        const maxAttempts = 50;
        while (attempts < maxAttempts) {
          const width =
            Math.random() * (obstacleMaxWidth - obstacleMinWidth) +
            obstacleMinWidth;
          const height =
            Math.random() * (obstacleMaxHeight - obstacleMinHeight) +
            obstacleMinHeight;
          const x =
            Math.random() * (canvasSize - width - 2 * spacing) + spacing;
          const y =
            Math.random() *
              (canvasSize - height - ballRadius * 4 - 2 * spacing) +
            ballRadius * 4 +
            spacing;

          const newObstaclePos = new Vector2D(x, y);

          let overlaps = false;
          if (simulationRef.current.obstacles) {
            for (const obs of simulationRef.current.obstacles) {
              if (
                newObstaclePos.x < obs.position.x + obs.width &&
                newObstaclePos.x + width > obs.position.x &&
                newObstaclePos.y < obs.position.y + obs.height &&
                newObstaclePos.y + height > obs.position.y
              ) {
                overlaps = true;
                break;
              }
            }
          }

          if (!overlaps) {
            simulationRef.current.addObstacle(
              newObstaclePos,
              width,
              height,
              `hsl(${Math.random() * 360}, 60%, 70%)`
            );
            break;
          }
          attempts++;
        }
        if (attempts >= maxAttempts)
          console.warn("Could not place all obstacles without overlap.");
      }
    },
    [canvasSize, ballRadius]
  );

  useEffect(() => {
    if (simulationRef.current) {
      generateObstacles(numObstacles);
    }
  }, [numObstacles, generateObstacles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const sim = simulationRef.current;

    if (!canvas || !ctx || !sim) {
      return;
    }

    const gameLoop = () => {
      sim.update(1);

      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      sim.obstacles.forEach((obstacle: Obstacle) => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(
          obstacle.position.x,
          obstacle.position.y,
          obstacle.width,
          obstacle.height
        );
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          obstacle.position.x,
          obstacle.position.y,
          obstacle.width,
          obstacle.height
        );
      });

      sim.balls.forEach((ball: Ball) => {
        ctx.beginPath();
        ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      });

      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [canvasSize]);

  const handleAddBall = () => {
    if (simulationRef.current) {
      const randomX =
        Math.random() * (canvasSize - ballRadius * 2) + ballRadius;
      const initialY = ballRadius + 5 + Math.random() * (canvasSize / 4);
      const initialVelocityX = Math.random() * 6 - 3;
      const initialVelocityY = Math.random() * 4 - 2;

      simulationRef.current.addBall(
        new Vector2D(randomX, initialY),
        new Vector2D(initialVelocityX, initialVelocityY),
        ballRadius,
        `hsl(${Math.random() * 360}, 70%, 60%)`,
        1
      );
    }
  };

  const handleResetSimulation = () => {
    if (simulationRef.current) {
      simulationRef.current.reset();
      generateObstacles(numObstacles);
    }
  };

  const controlGroupClass = "mb-4";
  const labelClass =
    "block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center"; // Updated for better alignment
  const valueDisplayClass = "text-blue-600 font-semibold";
  return (
    <div className="flex flex-col items-center p-2 bg-slate-100 min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-4 items-stretch">
        <div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            style={{ width: "100%", maxWidth: canvasSize, height: "auto" }}
            className="border border-slate-400 bg-slate-200 rounded-lg shadow-md"
          ></canvas>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-xl w-full md:w-[320px] flex flex-col justify-between">
          <div>
            <div className={controlGroupClass}>
              <label htmlFor="gravity" className={labelClass}>
                Gravity:
                <span className={valueDisplayClass}>{gravityY.toFixed(2)}</span>
              </label>
              <Slider
                value={gravityY}
                min={0}
                max={2}
                step={0.01}
                onChange={(_, val) => setGravityY(Number(val))}
                aria-labelledby="gravity"
              />
            </div>
            <div className={controlGroupClass}>
              <label htmlFor="restitution" className={labelClass}>
                Bounciness (Higher than 1 gains velocity each bounce):
                <span className={valueDisplayClass}>
                  {restitution.toFixed(2)}
                </span>
              </label>
              <Slider
                value={restitution}
                min={0}
                max={1.5}
                step={0.01}
                onChange={(_, val) => setRestitution(Number(val))}
                aria-labelledby="restitution"
              />
            </div>
            <div className={controlGroupClass}>
              <label htmlFor="worldFriction" className={labelClass}>
                World Friction:
                <span className={valueDisplayClass}>
                  {worldFriction.toFixed(3)}
                </span>
              </label>
              <Slider
                value={worldFriction}
                min={0}
                max={0.1}
                step={0.001}
                onChange={(_, val) => setWorldFriction(Number(val))}
                aria-labelledby="worldFriction"
              />
            </div>
            <div className={controlGroupClass}>
              <label htmlFor="ballRadius" className={labelClass}>
                Ball Radius:
                <span className={valueDisplayClass}>{ballRadius}</span>
              </label>
              <Slider
                value={ballRadius}
                min={5}
                max={25}
                step={1}
                onChange={(_, val) => setBallRadius(Number(val))}
                aria-labelledby="ballRadius"
              />
            </div>
            <div className={controlGroupClass}>
              <label htmlFor="numObstacles" className={labelClass}>
                Obstacles:
                <span className={valueDisplayClass}>{numObstacles}</span>
              </label>
              <Slider
                value={numObstacles}
                min={0}
                max={10}
                step={1}
                onChange={(_, val) => setNumObstacles(Number(val))}
                aria-labelledby="numObstacles"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              onClick={handleAddBall}
              variant="contained"
              color="primary"
              fullWidth
            >
              Drop Ball
            </Button>
            <Button
              onClick={handleResetSimulation}
              variant="contained"
              color="error"
              fullWidth
            >
              Reset Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bounce;
