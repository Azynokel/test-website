const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
canvas.width = 405;
canvas.height = 648;

const gridSize = 81;
let gridsW = canvas.width / gridSize - 1;
let gridsH = canvas.height / gridSize;
let snake = [{x: 0, y: 3}];
let food = {x: gridsW - 2, y: 3};
let dx = 1;
let dy = 0;
let dxPrev = 1;
let dyPrev = 0;
let score = 1;

function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect((segment.x + 1) * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect((food.x + 1) * gridSize, food.y * gridSize, gridSize, gridSize);
}

function drawUI() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gridSize, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("S", 28, gridSize - 15);
    ctx.fillText("C", 28, gridSize * 1.5 - 15);
    ctx.fillText("O", 28, gridSize * 2 - 15);
    ctx.fillText("R", 28, gridSize * 2.5 - 15);
    ctx.fillText("E", 28, gridSize * 3 - 15);
    ctx.fillText((Math.floor(score /   10) % 10).toString(), 30, gridSize * 5 - 15);
    ctx.fillText((Math.floor(score       ) % 10).toString(), 30, gridSize * 5.5 - 15);
    ctx.fillText("/", 35, gridSize * 6 - 15);
    ctx.fillText("3", 30, gridSize * 6.5 - 15);
    ctx.fillText("2", 30, gridSize * 7 - 15);
}

function relocateFood() {
    food.x = Math.floor(Math.random() * (gridsW));
    food.y = Math.floor(Math.random() * (gridsH));

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            relocateFood();
            break;
        }
    }
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (snake[0].x >= gridsW) snake[0].x = 0;
    if (snake[0].x < 0) snake[0].x = gridsW - 1;
    if (snake[0].y >= gridsH) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = gridsH - 1;

    if (head.x === food.x && head.y === food.y) {
        // The snake ate the food
        score += 1;
        if (score < 32) {
            relocateFood();
        } else {
            document.location.reload();
        }
    } else {
        snake.pop();
    }

    dxPrev = dx;
    dyPrev = dy;
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        document.location.reload();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        drawFood();
        drawSnake();
        drawUI();
    }
    setTimeout(gameLoop, 250); // 100 milliseconds (10 FPS)
}

canvas.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });
  
  canvas.addEventListener("touchend", function (event) {
    let direction;
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
  
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
  
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          direction = "right";
      } else {
          direction = "left";
      }
    } else {
        if (deltaY > 0) {
          direction = "down";
      } else {
          direction = "up";
      }
    }
    move(direction);
  });

document.addEventListener("keydown", (event) => {
    let direction;

    switch (event.key) {
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowRight":
            direction = "right";

            break;
        case "ArrowDown":
            direction = "down";
            break;
    }

    move(direction)
});

function move(direction) {
    switch (direction) {
        case "left":
            if (dxPrev === 0) {
                dx = -1;
                dy = 0;
            }
            break;
        case "up":
            if (dyPrev === 0) {
                dx = 0;
                dy = -1;
            }
            break;
        case "right":
            if (dxPrev === 0) {
                dx = 1;
                dy = 0;
            }
            break;
        case "down":
            if (dyPrev === 0) {
                dx = 0;
                dy = 1;
            }
            break;
    }
}

gameLoop();
