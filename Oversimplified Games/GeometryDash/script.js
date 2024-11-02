const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.height = 640;
canvas.width = 360;
const player = { x: 50, y: canvas.height / 2, size: 20, velocity: 0, jumpPower: 5 };
const gravity = 0.3;
const obstacles = [];
const obstacleSize = 20;
const spawnHeights = [20, 40, 60]
let floor = false;

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawObstacles() {
    ctx.fillStyle = "red";
    for (const obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function secA() {
    let obstacle = {
        x: canvas.width,
        y: canvas.height - obstacleSize,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 3,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize * 2,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 6,
        y: canvas.height - obstacleSize * 3,
        width: obstacleSize,
        height: obstacleSize * 3,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 9,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize * 2,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 12,
        y: canvas.height - 20,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
}
function secB() {
    let obstacle = {
        x: canvas.width,
        y: canvas.height - obstacleSize,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 3,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize * 2,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 6,
        y: canvas.height - obstacleSize,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 9,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize * 2,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 12,
        y: canvas.height - 20,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
}
function secC() {
    let obstacle = {
        x: canvas.width,
        y: canvas.height - obstacleSize,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize,
        y: canvas.height - obstacleSize,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 4,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 5,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 8,
        y: canvas.height - obstacleSize * 3,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 9,
        y: canvas.height - obstacleSize * 3,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 10,
        y: canvas.height - obstacleSize * 3,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
}
function secD() {
    let obstacle = {
        x: canvas.width,
        y: canvas.height - obstacleSize,
        width: obstacleSize,
        height: obstacleSize,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 3,
        y: canvas.height - obstacleSize * 2,
        width: obstacleSize,
        height: obstacleSize * 2,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 6,
        y: canvas.height - obstacleSize * 3,
        width: obstacleSize,
        height: obstacleSize * 3,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 9,
        y: canvas.height - obstacleSize * 4,
        width: obstacleSize,
        height: obstacleSize * 4,
    };
    obstacles.push(obstacle);
    obstacle = {
        x: canvas.width + obstacleSize * 12,
        y: canvas.height - obstacleSize * 5,
        width: obstacleSize,
        height: obstacleSize * 5,
    };
    obstacles.push(obstacle);
}
function update() {
    player.velocity += gravity;
    player.y += player.velocity;
    floor = false;

    if (player.y + player.size > canvas.height) {
        player.y = canvas.height - player.size;
        player.velocity = 0;
        floor = true;
    }

    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (player.velocity >= 0 &&
            player.y + player.size <= obstacle.y + 8 &&
            player.x < obstacle.x + obstacle.width &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.size >= obstacle.y)
        {
            player.y = obstacle.y - player.size;
            player.velocity = 0;
            floor = true;
        }
        else if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.size > obstacle.y
        ) {
            // Collision detected, you can add your game over logic here.
            alert("Game Over!");
        }
        if (obstacle.x + obstacleSize <= 0) {
            obstacles.splice(i, 1);
        }
        obstacle.x -= 2;
    }
}

function gameLoop() {
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function (event) {
    if ((event.key === " " || event.key === "Spacebar") && floor === true) {
        player.velocity = -player.jumpPower;
    }
});

// Create obstacles at regular intervals
setInterval(() => {
    let chooseSec = Math.floor(Math.random() * 3);
    switch(chooseSec) {
        case 0: secA(); break;
        case 1: secB(); break;
        case 2: secC(); break;
        case 3: secD(); break;
    }

    },2360);

gameLoop();