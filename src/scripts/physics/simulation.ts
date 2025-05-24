import { Vector2D } from "./vector2d";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

export interface SimulationConfig {
  gravity: Vector2D;
  restitution: number;
  canvasWidth: number;
  canvasHeight: number;
  worldFriction: number;
  maxVelocity?: number;
}

export class PhysicsSimulation {
  public balls: Ball[];
  public obstacles: Obstacle[];
  public config: SimulationConfig;

  private nextBallId: number;
  private nextObstacleId: number;

  constructor(config: SimulationConfig) {
    this.balls = [];
    this.obstacles = [];
    this.config = config;
    this.nextBallId = 0;
    this.nextObstacleId = 0;
  }

  addBall(
    position: Vector2D,
    velocity: Vector2D,
    radius: number,
    color: string,
    mass: number = 1
  ): void {
    this.balls.push({
      id: this.nextBallId++,
      position,
      velocity,
      radius,
      color,
      mass,
    });
  }

  addObstacle(
    position: Vector2D,
    width: number,
    height: number,
    color: string
  ): void {
    this.obstacles.push({
      id: this.nextObstacleId++,
      position,
      width,
      height,
      color,
    });
  }

  clearBalls(): void {
    this.balls = [];
    this.nextBallId = 0;
  }

  clearObstacles(): void {
    this.obstacles = [];
    this.nextObstacleId = 0;
  }

  reset(): void {
    this.clearBalls();
    this.clearObstacles();
  }

  update(deltaTime: number = 1): void {
    this.balls.forEach((ball) => {
      ball.velocity = ball.velocity.add(
        this.config.gravity.multiply(deltaTime)
      );

      if (this.config.worldFriction > 0) {
        ball.velocity = ball.velocity.multiply(
          1 - this.config.worldFriction * deltaTime
        );
      }

      const maxVelocity = this.config.maxVelocity ?? 20;
      if (ball.velocity.magnitude() > maxVelocity) {
        ball.velocity = ball.velocity.normalize().multiply(maxVelocity);
      }

      ball.position = ball.position.add(ball.velocity.multiply(deltaTime));

      this.handleWallCollisions(ball);
      this.obstacles.forEach((obstacle) => {
        this.handleBallObstacleCollision(ball, obstacle);
      });

      if (this.config.restitution < 1.0 && this.config.worldFriction < 0.001) {
        const isEssentiallyOnFloor =
          ball.position.y >= this.config.canvasHeight - ball.radius - 0.1;
        const isMovingVerySlowlyY = Math.abs(ball.velocity.y) < 0.05;
        const isMovingVerySlowlyX = Math.abs(ball.velocity.x) < 0.05;

        if (
          isEssentiallyOnFloor &&
          isMovingVerySlowlyY &&
          this.config.gravity.y > 0
        ) {
          ball.velocity.y = 0;
          if (isMovingVerySlowlyX) {
            ball.velocity.x = 0;
          }
        }
      }
    });
  }

  private handleWallCollisions(ball: Ball): void {
    const { restitution, canvasWidth, canvasHeight } = this.config;
    const minSpeedToStop = 0.05;
    const jitterAmount = 0.05;

    if (ball.position.y + ball.radius > canvasHeight) {
      ball.position.y = canvasHeight - ball.radius;
      ball.velocity.y *= -restitution;
      if (
        restitution < 1.0 &&
        Math.abs(ball.velocity.y) < minSpeedToStop &&
        this.config.gravity.y > 0.01
      ) {
        ball.velocity.y = 0;
      }
    }
    if (ball.position.y - ball.radius < 0) {
      ball.position.y = ball.radius;
      ball.velocity.y *= -restitution;
      if (restitution < 1.0 && Math.abs(ball.velocity.y) < minSpeedToStop) {
        ball.velocity.y = 0;
      }
    }
    if (ball.position.x + ball.radius > canvasWidth) {
      ball.position.x = canvasWidth - ball.radius;
      ball.velocity.x *= -restitution;
      if (restitution < 1.0 && Math.abs(ball.velocity.x) < minSpeedToStop) {
        ball.velocity.x = 0;
      }
    }
    if (ball.position.x - ball.radius < 0) {
      ball.position.x = ball.radius;
      ball.velocity.x *= -restitution;
      if (restitution < 1.0 && Math.abs(ball.velocity.x) < minSpeedToStop) {
        ball.velocity.x = 0;
      }
    }

    if (
      restitution < 1.0 &&
      ball.velocity.y === 0 &&
      ball.position.y >= canvasHeight - ball.radius - 0.1 &&
      Math.abs(ball.velocity.x) < minSpeedToStop &&
      this.config.gravity.y > 0.01
    ) {
      ball.velocity.x = 0;
    }

    if (
      ball.position.y + ball.radius >= canvasHeight ||
      ball.position.y - ball.radius <= 0 ||
      ball.position.x + ball.radius >= canvasWidth ||
      ball.position.x - ball.radius <= 0
    ) {
      ball.velocity.x += (Math.random() - 0.5) * jitterAmount;
      ball.velocity.y += (Math.random() - 0.5) * jitterAmount;
    }
  }

  private handleBallObstacleCollision(ball: Ball, obstacle: Obstacle): void {
    const { restitution } = this.config;
    const minSpeedToStop = 0.05;
    const jitterAmount = 0.05;

    const closestX = Math.max(
      obstacle.position.x,
      Math.min(ball.position.x, obstacle.position.x + obstacle.width)
    );
    const closestY = Math.max(
      obstacle.position.y,
      Math.min(ball.position.y, obstacle.position.y + obstacle.height)
    );

    const collisionVector = new Vector2D(
      ball.position.x - closestX,
      ball.position.y - closestY
    );
    const distance = collisionVector.magnitude();

    if (distance < ball.radius) {
      const overlap = ball.radius - distance;
      let normal = collisionVector.normalize();
      if (distance === 0) {
        const obstacleCenterX = obstacle.position.x + obstacle.width / 2;
        const obstacleCenterY = obstacle.position.y + obstacle.height / 2;
        normal = ball.position
          .subtract(new Vector2D(obstacleCenterX, obstacleCenterY))
          .normalize();
        if (normal.magnitude() === 0) normal = new Vector2D(0, -1);
      }

      ball.position = ball.position.add(normal.multiply(overlap));

      const dotProduct = ball.velocity.dot(normal);
      const reflection = normal.multiply(2 * dotProduct);
      ball.velocity = ball.velocity.subtract(reflection).multiply(restitution);

      if (restitution < 0.3 && ball.velocity.magnitude() < minSpeedToStop) {
        ball.velocity = new Vector2D(0, 0);
      }

      ball.velocity.x += (Math.random() - 0.5) * jitterAmount;
      ball.velocity.y += (Math.random() - 0.5) * jitterAmount;
    }
  }

  updateConfig(newConfig: Partial<SimulationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}
