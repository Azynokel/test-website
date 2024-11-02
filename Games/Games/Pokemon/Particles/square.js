import { Particle } from './particle.js';

export class Square extends Particle{
    update() {
        super.update();
    }
    draw(ctx) { 
        ctx.save();
        ctx.translate(this.getX(), this.getY());
        ctx.rotate(this.getAngle() * Math.PI / 180);
        ctx.fillStyle = this.getColor();
        ctx.fillRect(-this.getSize() / 2, -this.getSize() / 2, this.getSize(), this.getSize());
        ctx.restore();
    }
}