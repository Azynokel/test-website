import { Particle } from './particle.js';

export class Rectangle extends Particle{
    #height;
    #growthHeight;
    constructor() {
        super();
        this.#height = this.getWidth() * 2;
        this.#growthHeight = this.getGrowthWidth();
    }
    update() {
        super.update();
        this.setHeight(this.getHeight() + this.getGrowthHeight());
    }
    draw(ctx) { 
        ctx.save();
        ctx.translate(this.getX(), this.getY());
        ctx.rotate(this.getAngle() * Math.PI / 180);
        ctx.fillStyle = this.getColor();
        ctx.fillRect(-this.getWidth() / 2, -this.getHeight() / 2, this.getWidth(), this.getHeight()); 
        ctx.restore();
    }
    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
    getSize() {
        return (this.getWidth(), this.getHeight());
    }
    setWidth(size) {
        super.setSize(size);
    }
    getWidth() {
        return super.getSize();
    }
    setHeight(height) {
        this.#height = height;
    }
    getHeight() {
        return this.#height;
    }
    animateSize(widthA, heightA, widthB, heightB) {
        this.setSize(widthA, heightA);
        this.setGrowth((widthB - widthA) / (this.getDeath() - this.getAge()), (heightB - heightA) / (this.getDeath() - this.getAge()));
    }
    setGrowth(growthWidth, growthHeight) {
        this.setGrowthWidth(growthWidth);
        this.setGrowthHeight(growthHeight);
    }
    getGrowth() {
        return (this.getGrowthWidth(), this.getGrowthHeight());
    }
    getGrowthWidth() {
        return super.getGrowth();
    }
    setGrowthWidth(growth) {
        super.setGrowth(growth);
    }
    getGrowthHeight() {
        return this.#growthHeight;
    }
    setGrowthHeight(growthHeight) {
        this.#growthHeight = growthHeight;
    }
}