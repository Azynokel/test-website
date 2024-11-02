import { Circle } from './Particles/circle.js';
import { Square } from './Particles/square.js';
import { Triangle } from './Particles/triagle.js'; // Not working as intendet
import { Rectangle } from './Particles/rectangle.js';
import { Element } from './Particles/element.js';
import { Particlesystem } from './Particles/particlesystem.js';

export class Game {
    partSystem;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 900;
        this.canvas.height = 1600;
        this.partSystem = new Particlesystem();
        // wave System implementation

        window.addEventListener('contextmenu', e => {
            this.explosion(e);
        }); 
    }
    update() {
        this.partSystem.update();
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillRect(100, 100, 100, 100);
        this.partSystem.draw(ctx);
    }
    explosion(e) {
        for (var i = 1; i <= 50; i++) {
            this.p1 = new Circle();
            this.p1.setDeath(60);
            this.p1.setAnimationEnd(60);
            this.p1.setX(e.x / window.innerWidth * this.canvas.width);
            this.p1.setY(e.y / window.innerHeight * this.canvas.height);
            this.p1.setDirection(Math.random() * 360);
            this.p1.animateSpeed(5 + Math.random() * 6, 0);
            this.p1.animateColor('rgba(0, 0, 255, 1)', 'rgba(0, 0, 255, 0)');
            this.p1.animateSize(0, 20);
            this.partSystem.push(this.p1);
        }

        /*this.p1 = new Element(this.canvas);
        this.p1.setElement("water");
        this.p1.setAnimationEnd(30);
        this.p1.setDeath(99999);
        this.p1.animateSize(0, 200);
        this.p1.setX(e.x / window.innerWidth * this.canvas.width);
        this.p1.setY(e.y / window.innerHeight * this.canvas.height);
        this.p1.setDeathAction(this.test);
        this.partSystem.push(this.p1);*/
    }
    test() {
        console.log("success");
        var p1 = new Circle();
        p1.setX(200);
        p1.setY(200);
        p1.setSize(200);
        this.push(p1);
    }
}