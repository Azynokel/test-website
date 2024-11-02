import { Particle } from './particle.js';

export class Element extends Particle{
    #image;
    #element;
    constructor(canvas) {
        super();
        this.#element = 'none';
        this.#image = new Image;
        this.#image.src = "./Images/unknown.png";

        window.addEventListener('click' , e => {
            this.mouseX = e.x / window.innerWidth * canvas.width;
            this.mouseY = e.y / window.innerHeight * canvas.height;
            this.r = this.getSize() / 2;
            this.distance = Math.sqrt((this.mouseX - this.getX()) ** 2 + (this.mouseY - this.getY()) ** 2);
            if (this.distance <= this.r) {
                this.setAge(this.getDeath());
            }
        });
    }
    update() {
        super.update();
    }
    draw(ctx) {

        ctx.save();
        ctx.translate(this.getX(), this.getY());
        ctx.rotate(this.getAngle() * Math.PI / 180);
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(0, 0, this.getSize() / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.drawImage(this.#image, -this.getSize() / 2, -this.getSize() / 2, this.getSize(), this.getSize());
        ctx.restore();

    }
    setElement(element) {
        this.#element = element;

        switch (element) {
            case "water": this.#image.src = "./Images/water.png"; this.setColor("rgba(0, 0, 255, 0.5)"); break;
            case "fire": this.#image.src = "./Images/fire.png"; this.setColor("rgba(255, 0, 0, 0.3)"); break;
            default: this.#image.src = "./Images/unknown.png"; this.setColor("rgba(0, 0, 0, 0.5)");
        }
    }
    getElement() {
        return this.#element;
    }
}