const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 648; //640;
canvas.width = 405; // 360;

const gridSize = 3;
const tileSize = canvas.width / gridSize;
const upperSpace = (canvas.height - canvas.width) / 2;

let level = 1;
let score = 0;

function initializeGame() {
    const sequenze = generateSequenze(level);
    drawSequenze(0, sequenze);
}

function drawSequenze(n, seq) {
        setTimeout(function() {
            if (n < seq.length) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBoard();
                drawLevel();
                drawTile(seq[n] % gridSize, Math.floor(seq[n] / gridSize), tileColor(n%2));
                drawSequenze(n+1, seq);
            }
            else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBoard();
                eingabe(seq, 0);
            }
        }, 1000)
}

async function eingabe(seq, i) {
    drawLevel();
    let n;
    do {
        const mousePos = await userInput();
        const x = Math.floor(mousePos[0] / tileSize);
        const y = Math.floor((mousePos[1] - ((canvas.height - canvas.width) / 2)) / tileSize);
        n = y * gridSize + x;
    } while (n < 0 || n > gridSize * gridSize - 1)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawLevel();
    if (seq[i] === n) {
        score++;
        drawTile(n % gridSize, Math.floor(n / gridSize), rightTileColor(i % 2));
        if (i+1 < seq.length) {
            eingabe(seq, i+1);
        } 
        else {
            level += 1;
            initializeGame(); 
        }
    }
    else {
        drawTile(n % gridSize, Math.floor(n / gridSize), "#9F4A54");
        drawTile(seq[i] % gridSize, Math.floor(seq[i] / gridSize), "#235799");
        gameOver(); 
    }
}

function drawLevel() {
    ctx.clearRect(0, 0, canvas.width, 100);
    ctx.fillStyle = "#ABBEF1";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Level: " + level, canvas.width / 2, 50);
}

async function userInput() {
    return new Promise((resolve) => {
        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
        
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            resolve([x, y]); 
        });
    });
}

function generateSequenze(level) {
    let output = [];
    for (let i = 0; i < level; i++) {
        let value = Math.floor(Math.random() * gridSize * gridSize);
        output.push(value);
    }
    return output;
}

function gameOver() {
    const gameOverDiv = document.getElementById("game-over");
    const scoreDisplay = document.getElementById("score-display");
    const restartButton = document.getElementById("restart-button");

    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDiv.classList.remove("hidden");

    restartButton.addEventListener("click", function () {
        gameOverDiv.classList.add("hidden");
        document.location.reload();
    });
}

function tileColor(n) {
    switch (n) {
        case 0: return "#235799";
        case 1: return "#235779";
    }
}

function rightTileColor(n) {
    switch (n) {
        case 0: return "#81FF99";
        case 1: return "#81E499";
    }
}


function drawTile(x, y, col) {
    const tileX = x * tileSize;
    const tileY = y * tileSize + upperSpace;

    ctx.fillStyle = col;
    ctx.fillRect(tileX, tileY, tileSize, tileSize);

    ctx.strokeStyle = "#00A9A5"; 
    ctx.strokeRect(tileX, tileY, tileSize, tileSize);
}

function drawBoard() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            drawTile(j, i, "#F3F9D2");
        }
    }
}

drawBoard();
initializeGame(); 