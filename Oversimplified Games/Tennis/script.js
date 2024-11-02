const canvas = document.getElementById("tennisCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 360;
canvas.height = 640;

const blocks = []; // Array für die Blöcke
const blockWidth = 60;
const blockHeight = 20;
const blockSpace = 10;

let score = 0; // Score-Variable
let level = 1;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 4,
    radius: 10,
    velocityX: 0,
    velocityY: 10,
};

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    speed: 3,
};

let leftKeyPressed = false;
let rightKeyPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Funktion, um zufällige Blöcke zu erzeugen
function createBlocks(n) {
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < canvas.width / (blockWidth + blockSpace) -1; i++) {
            blocks.push({
                x: blockSpace + i * (blockWidth + blockSpace),
                y: blockSpace + j * (blockHeight + blockSpace),
                width: blockWidth,
                height: blockHeight,
                visible: true,
            });
    }
    }
}

// Funktion, um Blöcke zu zeichnen
function drawBlocks() {
    blocks.forEach((block) => {
        if (block.visible) {
            ctx.fillStyle = "red";
            ctx.fillRect(block.x, block.y, block.width, block.height);
        }
    });
}

// Funktion zur Kollisionsüberprüfung mit Blöcken
function checkBlockCollisions() {
    blocks.forEach((block) => {
        if (
            block.visible &&
            ball.x + ball.radius > block.x &&
            ball.x - ball.radius < block.x + block.width &&
            ball.y + ball.radius > block.y &&
            ball.y - ball.radius < block.y + block.height
        ) {
            // Berechne den horizontalen und vertikalen Abstand zwischen Ballmitte und Blockmitte
            const dx = Math.abs(ball.x - (block.x + block.width / 2));
            const dy = Math.abs(ball.y - (block.y + block.height / 2));

            // Wenn der horizontale Abstand größer ist, wird die horizontale Geschwindigkeit geändert
            if (dx > dy) {
                ball.velocityX = -ball.velocityX;
            } else {
                ball.velocityY = -ball.velocityY;
            }

            block.visible = false;
            score++; // Erhöhe den Score
        }
    });
}

function checkPaddleCollision() {
    if (
        ball.x + ball.radius > paddle.x &&
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y
    ) {
        // Berechne die relative Position des Balls zum Paddle
        const relativePosition = ball.x - (paddle.x + paddle.width / 2);
        
        // Ändere die horizontale Geschwindigkeit des Balls basierend auf der relativen Position
        ball.velocityX = relativePosition / (paddle.width / 2) * 5;

        ball.y = paddle.y - ball.radius;
        ball.velocityY = -ball.velocityY;

        let next = true;
        blocks.forEach((block) => {
            next = (next && !block.visible);
            console.log(next);
        });

        if(next) {
            level += 1;
            createBlocks(level);
        }
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

createBlocks(level); // Blöcke erstellen
console.log(blocks.length);

function update() {
    if (leftKeyPressed) {
        paddle.x -= paddle.speed;
        if (paddle.x < 0) {
            paddle.x = 0;
        }
    }
    if (rightKeyPressed) {
        paddle.x += paddle.speed;
        if (paddle.x + paddle.width > canvas.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball-Wand-Kollision
    if (ball.x + ball.radius > canvas.width) {
        ball.velocityX = -ball.velocityX;
        ball.x = canvas.width - ball.radius;
    }
    if (ball.x - ball.radius < 0) {
        ball.velocityX = -ball.velocityX;
        ball.x = 0 + ball.radius;
    }
    if (ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
        ball.y = 0 + ball.radius;
    }

    // Ball-Paddle-Kollision
    checkPaddleCollision()

    // Ball-Boden-Kollision
    if (ball.y + ball.radius > canvas.height) {
        // Game Over
        alert("Game Over!");
        document.location.reload();
    }
    
    // Kollisionsüberprüfung mit Blöcken
    checkBlockCollisions(); 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBlocks(); // Blöcke zeichnen
    drawScore(); // Score aktualisieren

    requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        leftKeyPressed = true;
    } else if (event.key === "ArrowRight") {
        rightKeyPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        leftKeyPressed = false;
    } else if (event.key === "ArrowRight") {
        rightKeyPressed = false;
    }
});

update();

