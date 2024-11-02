import { Game } from './game.js';

let canvas;
let ctx;
let game;

window.addEventListener('load', function() {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');

    game = new Game(canvas);

    animate();
});

function animate() {
    game.draw(ctx); 
    requestAnimationFrame(animate);
}