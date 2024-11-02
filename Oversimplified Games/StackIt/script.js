const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 405;
canvas.height = 648;
let blocks = [];
let particles = [];
let speedX = 1;
let speedY = 0.75;
let score = 0;
let gameOverChecker = false;

class Block {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
}

function drawBlocks(blocks) {
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        ctx.strokeStyle = "white";
        ctx.strokeRect(b.x, b.y, b.width, b.height);
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, canvas.width / 2, 40);
}

function moveActive(bActive) {
    bActive.y += speedY;
    bActive.x += speedX;
    if (bActive.x + bActive.width > canvas.width && speedX > 0) {
        speedX *= -1;
    }
    if (bActive.x < 0 && speedX < 0) {
        speedX *= -1;
    }
    if (bActive.y > canvas.height - bActive.height) {
        gameOver();
    }
}

function movePassive(blocks) {
    for (let i = 0; i < blocks.length-1; i++) {
        const b = blocks[i];
        b.y += speedY;
        if (b.y > canvas.height) {
            blocks.splice(0, 1);
        }
    }
}

function moveParticles(particles) {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += speedY * 4;
        if (p.y > canvas.height) {
            particles.splice(0, 1);
        }
    }
}

function cut(bActive, bTower) {
    if (Math.abs(bActive.x - bTower.x) <= Math.abs(speedX * 4)) {
        bActive.x = bTower.x;
        bActive.color = "#FFD700";
        score += 2;
    } 
    else {
        const newWidth = bActive.width - Math.abs(bTower.x - bActive.x);
        if (newWidth <= 0) {
            gameOver();
        }
        else {
            const p = new Block(bActive.x, bActive.y, bActive.width - newWidth, bActive.height, bActive.color);
            if (bActive.x < bTower.x) { 
                bActive.x = bTower.x; 
            }
            else {
                p.x = bActive.x + newWidth;
            }
            bActive.width = newWidth;
            particles.push(p);
            score += 1;
        }
    }
}

function generateColor() {
    const i = Math.floor(Math.random() * 4);
    switch(i) {
        case 0: return "#AA7BC3"; break;
        case 1: return "#CC92C2"; break;
        case 2: return "#DBA8AC"; break;
        case 3: return "#DEB0B4"; break; 
        case 4: return "#9F63BF"; break; 
    }
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

function resetGame() {
    score = 0;
    blocks = [];
    particles = [];
    gameOverChecker = false;
    speedX = 1;
    speedY = 0.75;
    score = 0;
}

function initializeGame() {
    let b1 = new Block(40, canvas.height / 4, canvas.width - 80, canvas.height, generateColor());
    let b2 = new Block(0, b1.y - 100, b1.width, 100, generateColor());
    
    blocks.push(b1)
    blocks.push(b2)
}


function update(timestamp) {
    let deltaTime = (timestamp - lastTime) / 17;
    lastTime = timestamp;

    if (!gameOverChecker) {
        speedY = (3.7 / ((canvas.height + 200)^2)) * (((canvas.height - blocks[blocks.length - 1].y) + 200)^2) * deltaTime;
        //speedY = ((canvas.height - blocks[blocks.length -1].y) / canvas.height) * (blocks[blocks.length -1].height / ((canvas.widh - blocks[blocks.length -1].width) / 2) / speedX);
        //console.log(speedY);
        moveActive(blocks[blocks.length - 1]);
        movePassive(blocks)
        moveParticles(particles);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBlocks(blocks);
        drawBlocks(particles);
        drawScore();
    }
    requestAnimationFrame(update);
}

function click() {
    const bActive = blocks[blocks.length - 1];
    const bTower = blocks[blocks.length - 2];
    cut(bActive, bTower);
    const rightOrLeft = Math.floor(Math.random() * 2);
    const bNew = new Block(rightOrLeft * (canvas.width - bActive.width), bActive.y - bActive.height, bActive.width, bActive.height, generateColor());
    blocks.push(bNew);

    speedX += (0.03 * Math.sign(speedX));
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        click();
    }
});

document.addEventListener("touchstart", click);

let lastTime = 0;
initializeGame();
update(0);
