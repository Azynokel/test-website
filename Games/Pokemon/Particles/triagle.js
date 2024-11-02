import { Particle } from './particle.js';

export class Triangle extends Particle{
    update() {
        super.update();
    }
    draw(ctx) { 
        ctx.save();
        ctx.translate(this.getX(), this.getY());
        ctx.rotate(this.getAngle() * Math.PI / 180);
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        var verschiebung = -this.getSize() / 3; // Damit der Schwerpunkt des dreiecks auch der Mittelpunkt der Rotation ist
        ctx.moveTo(verschiebung, verschiebung);
        ctx.lineTo(verschiebung, this.getSize() + verschiebung);
        ctx.lineTo(this.getSize() + verschiebung, verschiebung);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}