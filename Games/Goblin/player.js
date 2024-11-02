export class Player {
    #game;
    #x;
    #y;
    #speed;
    #maxSpeed;
    #direction;
    #height;
    #width;
    #vy;
    #image;
    #jumpHeight;
    constructor(game, x, y) {
        this.#game = game;
        this.#x = x;
        this.#y = y;
        this.#speed = 0;
        this.#maxSpeed = 1;
        this.#direction = 0;
        this.#width = 11;
        this.#height = 16;
        this.#vy = 0;
        this.#jumpHeight = 3;
        this.#image = new Image();
        this.#image.src = './Images/player.png';
    }
    update(input) {
        this.#direction = input.keyRight - input.keyLeft;
        this.#speed = this.#direction * this.#maxSpeed;

        for (let i = 0; i < this.#game.blocks.length; i++) {
            if (this.#game.colision(this.#x + this.#speed, this.#y, this.#width, this.#height, this.#game.blocks[i])) {
                while (!(this.#game.colision(this.#x + Math.sign(this.#speed), this.#y, this.#width, this.#height, this.#game.blocks[i]))) {
                    this.#x += Math.sign(this.#speed);
                }
                this.#speed = 0; 
            }
        }
        this.#x += this.#speed; 
        this.#x = Math.floor(this.#x);

        this.#vy += this.#game.gravity;
        if (input.keyUp) {
            this.#vy = - this.#jumpHeight;
        }
        for (let i = 0; i < this.#game.blocks.length; i++) {
            if (this.#game.colision(this.#x, this.#y + this.#vy, this.#width, this.#height, this.#game.blocks[i])) {
                while (!(this.#game.colision(this.#x, this.#y + Math.sign(this.#vy), this.#width, this.#height, this.#game.blocks[i]))) {
                    this.#y += Math.sign(this.#vy);
                }
                this.#vy = 0;
            }
        }
        this.#y += this.#vy;
        this.#y = Math.floor(this.#y);
    }
    draw(ctx) {
        ctx.fillStyle = 'white'; 
        ctx.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height);
        //ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
    }
}