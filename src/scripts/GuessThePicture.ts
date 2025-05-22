import { drawBlurredImage } from "./BlurImage";

interface GameState {
  imageUrl: string;
  correctAnswers: string[];
  currentBlur: number;
  blurStep: number;
  canvas: HTMLCanvasElement;
}

export class GuessGame {
  private state: GameState;

  constructor(imageUrl: string, correctAnswers: string[], canvas: HTMLCanvasElement, initialBlur = 50, blurStep = 10) {
    this.state = {
      imageUrl,
      correctAnswers: correctAnswers.map(answer => answer.toLowerCase()),
      currentBlur: initialBlur,
      blurStep,
      canvas,
    };

    drawBlurredImage(canvas, imageUrl, initialBlur);
  }

  guess(answer: string): number {
    // Return 0 if correct, 1 if incorrect but still blurred, 2 if game over
    const guess = answer.trim().toLowerCase();

    if (this.state.correctAnswers.includes(guess)) {
      this.state.currentBlur = 0;
      drawBlurredImage(this.state.canvas, this.state.imageUrl, 0);
      return 0
    }

    this.state.currentBlur = Math.max(0, this.state.currentBlur - this.state.blurStep);
    drawBlurredImage(this.state.canvas, this.state.imageUrl, this.state.currentBlur);
    return this.state.currentBlur <= 0 ? 2 : 1;
  }
}
