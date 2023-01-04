import { MarchingSquare } from "./MarchingSquare";

export default class MarchingSquareApp {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  marchingSquare: MarchingSquare;
  constructor(apiUrl: string | null) {
    this.canvas = document.getElementById(
      "marching-squares-canvas"
    ) as HTMLCanvasElement;

    if (this.canvas == null) {
      throw new Error("Could not find canvas.");
    }

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.canvas.width = 500;
    this.canvas.height = 500;

    this.marchingSquare = new MarchingSquare(
      this.canvas.width,
      this.canvas.height,
      5
    );
  }

  Start() {
    this.animate(0);
  }

  animate(timestamp: number) {
    this.draw();
    requestAnimationFrame((n) => this.animate(n));
  }

  draw() {
    this.ctx.fillStyle = "#94d300";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.marchingSquare.draw(this.ctx);
  }
}
