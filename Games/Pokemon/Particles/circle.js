import { Particle } from './particle.js';

export class Circle extends Particle{
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
        ctx.restore();
        
        /* Ohne Angle (weil beim Kreis irrelevant xD)
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();*/
    }
}