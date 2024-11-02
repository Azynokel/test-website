let canvas;
let context;

window.addEventListener('load', function () {
    canvas = document.getElementById("canvas1");
    context = canvas.getContext("2d");
    canvas.width = 810;
    canvas.height = 1296;

    // Event listener for mousemove event
    canvas.addEventListener("mousemove", movePlayer);

    // Event listener for toutch events
    canvas.addEventListener("touchstart", movePlayer);
    canvas.addEventListener("touchmove", movePlayer);
    canvas.addEventListener("touchend", movePlayer);

    // Start the game loop
    update();
    generateObject();
});

// Player character
const player = {
    x: 330,
    y: 648-75 + 60,
    width: 150,
    height: 150,
    speed: 5,
    color: "#FFD166",
    isMoving: false
};

// Falling objects
const objects = [];
const objectSize = 80;
const objectSpeed = 5;
let objectInterval = 1000; // Initial interval duration in milliseconds

// Game state
let gameOverChecker = false;
let score = 0;

// Function to draw the player character
function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw the falling objects
function drawObjects() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        context.fillStyle = "#EF476F";
        context.fillRect(object.x, object.y, objectSize, objectSize);
    }
}

function drawBackground() {
    context.fillStyle = "#06D6A0";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to clear the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the game
function update() {
    if (!gameOverChecker) {
        clearCanvas();
        drawBackground();
        drawPlayer();
        drawObjects();
        moveObjects();
        checkCollision();
        displayScore();
    } else {
        gameOver();
    }

    // Request the next frame
    requestAnimationFrame(update);
}

// Function to move the falling objects
function moveObjects() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.x += object.speedX;
        object.y += object.speedY;
    }

    // Remove objects that are off the canvas
    objects.filter(object => object.y < canvas.height);
}

// Function to check collision between player and objects
function checkCollision() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (
            player.x < object.x + objectSize &&
            player.x + player.width > object.x &&
            player.y < object.y + objectSize &&
            player.y + player.height > object.y
        ) {
            gameOverChecker = true;
        }
    }
}

// Function to display the current score
function displayScore() {
    context.fillStyle = "white";
    context.font = "32px Arial";
    context.fillText("Score: " + score, 20, 45);
}

// Function to move the player character
function movePlayer(event) {
    if (event.type === "touchstart" || event.type === "mousemove") {
        player.isMoving = true;
    } else if (event.type === "touchend") {
        player.isMoving = false;
    }

    if (player.isMoving) {
        const rect = canvas.getBoundingClientRect();
        const touchX = event.clientX || event.touches[0].clientX;
        const touchY = event.clientY || event.touches[0].clientY;

        player.x = (touchX / window.innerWidth * canvas.width) - rect.left - player.width / 2;
        player.y = (touchY / window.innerHeight * canvas.height) - rect.top - player.height / 2;
    }
}

// Function to end the game
function endGame() {
    clearCanvas();
    context.fillStyle = "#06D6A0";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.font = "60px Arial";
    context.fillText("Game Over", canvas.width / 2 - 160, canvas.height / 2);
    context.font = "40px Arial";
    context.fillText("Final Score: " + score, canvas.width / 2 - 120, canvas.height / 2 + 80);
}

function gameOver() {
    gameOverChecker = true;
    const gameOverDiv = document.getElementById("game-over");
    const scoreDisplay = document.getElementById("score-display");
    const restartButton = document.getElementById("restart-button");

    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDiv.classList.remove("hidden");

    restartButton.addEventListener("click", function () {
        document.location.reload();
    });
}

function generateObject() {
    if (!gameOverChecker) {
        const side = Math.floor(Math.random() * 4); // Randomly select the side (0: top, 1: right, 2: bottom, 3: left)
        let x, y, speedX, speedY;

        if (side === 0) {
            x = Math.random() * (canvas.width - objectSize);
            y = -objectSize;
            speedX = (canvas.width / 2 - x) / 200;
            speedY = objectSpeed;
        } else if (side === 1) {
            x = canvas.width;
            y = Math.random() * (canvas.height - objectSize);
            speedX = -objectSpeed;
            speedY = (canvas.height / 2 - y) / 200;
        } else if (side === 2) {
            x = Math.random() * (canvas.width - objectSize);
            y = canvas.height;
            speedX = (canvas.width / 2 - x) / 200;
            speedY = -objectSpeed;
        } else if (side === 3) {
            x = -objectSize;
            y = Math.random() * (canvas.height - objectSize);
            speedX = objectSpeed;
            speedY = (canvas.height / 2 - y) / 200;
        }

        const object = { x, y, speedX, speedY };
        objects.push(object);
        score++; // Increase the score

        if (score % 10 === 0) {
            // Decrease the interval duration by 100 milliseconds for every 10 points
            objectInterval -= 100;
            if (objectInterval < 300) {
                objectInterval = 300; // Set a minimum interval of 200 milliseconds
            }
        }

        // Call the generateObject function again after the objectInterval duration
        setTimeout(generateObject, objectInterval);
    }
}
