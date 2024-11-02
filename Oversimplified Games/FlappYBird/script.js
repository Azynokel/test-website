const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 405;
canvas.height = 648;

var bird;
const imgBird = document.createElement('img');
imgBird.src = './images/bird.png';
const imgPipe = document.createElement('img');
imgPipe.src = './images/pipe.png';
const imgBackground = document.createElement('img');
imgBackground.src = './images/background.png';
const imgCloud = document.createElement('img');
imgCloud.src = './images/cloud.png';
var clouds = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}] 
var cloudX = 0;

const soundHit = new Audio('./sounds/hitHurt.wav');
const soundFlap = new Audio('./sounds/jump.wav');
const soundScore = new Audio('./sounds/pickupCoin.wav');
var pipe;
let score = 0;
let gameOverChecker = false;

function initializeGame() {
    bird = {
        x: 50,
        y: canvas.height / 2,
        radius: 20,
        velocity: 0,
        gravity: 0.5,
        jump: -10,
        image: imgBird,
    };
    pipe = {
        x: canvas.width,
        y: Math.floor(canvas.height / 2) - 100,
        width: 50,
        gap: 200,
        minHeight: 50,
        maxHeight: canvas.height - 250,
    };
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].x = i * ((canvas.width + imgCloud.width)/(clouds.length));
        clouds[i].y = Math.random() * (canvas.height / 2) + 20;
    }
    cloudX = 0;
}
function resetGame() {
    score = 0;
    gameOverChecker = false;
}
function gameOver() {
    gameOverChecker = true;
    const gameOverDiv = document.getElementById("game-over");
    const scoreDisplay = document.getElementById("score-display");
    const restartButton = document.getElementById("restart-button");

    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDiv.classList.remove("hidden");

    restartButton.addEventListener("click", function () {
        gameOverDiv.classList.add("hidden");
        resetGame();
        initializeGame();
    });
}

function drawClouds() {
    clouds.forEach(cloud => {
        ctx.drawImage(imgCloud, (canvas.width-imgCloud.width/2) - ((cloud.x+cloudX)%(canvas.width+imgCloud.width/2)-imgCloud.width/2), cloud.y, imgCloud.width/2, imgCloud.height/2);
    }); 
    // ctx.drawImage(imgCloud, 0, 0);
    cloudX++;
}

function drawBird() {
    /*ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();*/

    const rotationAngle = bird.velocity / 15;
    ctx.translate(bird.x, bird.y);
    ctx.rotate(rotationAngle);
    ctx.drawImage(imgBird, -bird.radius-10, -bird.radius, 55.5, 40); 

    ctx.rotate(-rotationAngle);
    ctx.translate(-bird.x, -bird.y);
}

function drawPipe() {
    /*ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
    ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - (pipe.y + pipe.gap));*/
    ctx.drawImage(imgPipe, pipe.x - 6, pipe.y + pipe.gap, pipe.width+12, 686)

    const rotationAngle = Math.PI;
    ctx.translate(pipe.x + (pipe.width / 2), pipe.y);
    ctx.rotate(rotationAngle);
    ctx.drawImage(imgPipe, -6-(pipe.width / 2), 0, pipe.width+12, 686); 
    ctx.rotate(-rotationAngle);
    ctx.translate(-(pipe.x + (pipe.width / 2)), -pipe.y);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, canvas.width / 2, 28);
    ctx.fillText("Score: " + score, canvas.width / 2, 32);
    ctx.fillText("Score: " + score, canvas.width / 2 + 2, 30);
    ctx.fillText("Score: " + score, canvas.width / 2 - 2, 30);


    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width / 2, 30);
}

function drawBackground() {
    ctx.drawImage(imgBackground, 0, canvas.height - 175, canvas.width, 175);
}

function update() {
    if (!gameOverChecker) {
        bird.velocity += bird.gravity;
    
        if (bird.y < bird.radius) {
            bird.y = bird.radius;
            bird.velocity = 0;
        }
    
        pipe.x -= 5;
        if (pipe.x + pipe.width < 0) {
            pipe.x = canvas.width;
            pipe.y = Math.floor(Math.random() * (pipe.maxHeight - pipe.minHeight + 1)) + pipe.minHeight;
            score++;
            if (score % 5 == 0) {
                soundScore.play();
            }
        }
    
        if (
            (bird.y > canvas.height - bird.radius - 40) ||
            (bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + pipe.width &&
            (bird.y - bird.radius < pipe.y || bird.y + bird.radius > pipe.y + pipe.gap))
        ) {
            soundHit.play();
            bird.velocity = 6;
            gameOver();
        }
    }
    bird.y += bird.velocity;
    if ((bird.y > canvas.height - bird.radius - 40)) {
        bird.velocity = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawClouds();
    drawBird();
    drawPipe();
    drawScore();
    requestAnimationFrame(update);
}

function jump() {
    bird.velocity = bird.jump;
    if (soundFlap) {
        soundFlap.pause();
        soundFlap.currentTime = 0;
    }
    soundFlap.play();
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !gameOverChecker) {
        jump();
    }
});
document.addEventListener("touchstart", (event) => {
    if (!gameOverChecker) {
        jump();
    }
});

initializeGame();
update();

