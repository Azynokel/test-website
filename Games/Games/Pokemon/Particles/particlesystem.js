export class Particlesystem {
    #particles;
    constructor() {
        this.#particles = new Array();
    }

    push(element) {
        this.#particles.push(element);
    }
    update() {
        for (let i = 0; i < this.#particles.length; i++) {
            var p = this.#particles[i];
            if (p.getAge() >= p.getDeath()) {
                //this.push("abc"); 
                this.#particles.splice(i, 1);
            } else {
                p.update();
            }
        }
    }
    draw(ctx) {
        for (let i = 0; i < this.#particles.length; i++) {
            this.#particles[i].draw(ctx);
        }
    }
}