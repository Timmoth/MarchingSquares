import { Position } from "./position";
const { createNoise3D } = require("simplex-noise");

export class MarchingSquare {
  positions: number[][];
  width: number;
  height: number;
  size: number;
  horizontalNodeCount: number;
  verticalNodeCount: number;
  noise: any;
  dt: 0;
  constructor(width: number, height: number, size: number) {
    this.width = width;
    this.height = height;
    this.size = size;
    this.positions = [];
    this.horizontalNodeCount = this.width / this.size;
    this.verticalNodeCount = this.height / this.size;
    this.noise = createNoise3D();
    this.dt = 0;

    for (let i = 0; i < this.horizontalNodeCount; i++) {
      let col: number[] = [];
      for (let j = 0; j < this.verticalNodeCount; j++) {
        col[j] = 0;
      }
      this.positions.push(col);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.dt += 0.03;
    for (let i = 0; i < this.horizontalNodeCount; i++) {
      var col = this.positions[i];
      for (let j = 0; j < this.verticalNodeCount; j++) {
        var val = (this.noise(i / 30, j / 30, this.dt) + 1) / 2;
        col[j] = Math.round(val);
        this.drawDot(ctx, this.getPosition(i, j), val);
      }
    }

    for (let i = 0; i < this.horizontalNodeCount - 1; i++) {
      for (let j = 0; j < this.verticalNodeCount - 1; j++) {
        const e0 = this.positions[i][j];
        const e1 = this.positions[i][j + 1];
        const e2 = this.positions[i + 1][j];
        const e3 = this.positions[i + 1][j + 1];
        this.drawSquare(ctx, 8 * e3 + 4 * e2 + 2 * e1 + e0, i, j);
      }
    }
  }

  drawSquare(
    ctx: CanvasRenderingContext2D,
    state: number,
    i: number,
    j: number
  ) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    let p0: Position = null;
    let p1: Position = null;

    switch (state) {
      case 1:
      case 14:
        p0 = this.getPosition(i + 0.5, j + 0);
        p1 = this.getPosition(i + 0, j + 0.5);
        this.drawLine(ctx, p0, p1);
        break;
      case 2:
      case 13:
        p0 = this.getPosition(i + 0, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 1);
        this.drawLine(ctx, p0, p1);
        break;
      case 3:
      case 12:
        p0 = this.getPosition(i + 0.5, j + 0);
        p1 = this.getPosition(i + 0.5, j + 1);
        this.drawLine(ctx, p0, p1);
        break;
      case 4:
      case 11:
        p0 = this.getPosition(i + 1, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 0);
        this.drawLine(ctx, p0, p1);
        break;
      case 5:
      case 10:
        p0 = this.getPosition(i + 1, j + 0.5);
        p1 = this.getPosition(i + 0, j + 0.5);
        this.drawLine(ctx, p0, p1);
        break;
      case 6:
        p0 = this.getPosition(i + 0, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 1);
        this.drawLine(ctx, p0, p1);
        p0 = this.getPosition(i + 1, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 0);
        this.drawLine(ctx, p0, p1);
        break;
      case 7:
      case 8:
        p0 = this.getPosition(i + 1, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 1);
        this.drawLine(ctx, p0, p1);
        break;
      case 9:
        p0 = this.getPosition(i + 1, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 1);
        this.drawLine(ctx, p0, p1);
        p0 = this.getPosition(i + 0, j + 0.5);
        p1 = this.getPosition(i + 0.5, j + 0);
        this.drawLine(ctx, p0, p1);
        break;
      default:
        break;
    }
  }

  getPosition(i: number, j: number): Position {
    return new Position(i * this.size, j * this.size);
  }

  drawDot(ctx: CanvasRenderingContext2D, position: Position, number: number) {
    ctx.fillStyle = this.calcColor(number);

    ctx.beginPath();
    ctx.arc(position.x, position.y, 4, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  drawLine(
    ctx: CanvasRenderingContext2D,
    position0: Position,
    position1: Position
  ) {
    ctx.beginPath();
    ctx.moveTo(position0.x, position0.y);
    ctx.lineTo(position1.x, position1.y);
    ctx.stroke();
  }
  calcColor(val: number): string {
    var minHue = 240,
      maxHue = 0;
    var curPercent = val;
    var colString =
      "hsl(" + (curPercent * (maxHue - minHue) + minHue) + ",100%,50%)";
    return colString;
  }
}
