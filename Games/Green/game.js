export class Game {
    constructor(canvas) {
        this.canvas = canvas;
    }
    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}