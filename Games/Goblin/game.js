import { Block } from './block.js';
import { Player } from './player.js';
import { Input } from './input.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 50;
        this.canvas.height = 80;
        this.input = new Input();
        this.gravity = 0.3;
        this.blocks = new Array(new Block(0, this.canvas.height - 1, this.canvas.width, 1), 
                                new Block(0, 0, this.canvas.width, 1),
                                new Block(0, 0, 1, this.canvas.height),
                                new Block(this.canvas.width - 1, 0, 1, this.canvas.height),
                                new Block(20, 35, 10, 10)
        )
        this.player = new Player(this, 1, 1);
    }
    update() {
        this.player.update(this.input);
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(ctx); 
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw(ctx);
        }
        /*ctx.fillStyle = 'olive';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);*/
    }
    colision(x, y, w, h, obj) {
        return (x < (obj.x + obj.width) && (x + w) > obj.x && y < (obj.y + obj.height) && (y + h) > obj.y);
    }
}