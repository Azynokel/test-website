const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 405;
canvas.height = 648;

const gridSize = 4;
const tileSize = canvas.width / gridSize;
const board = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(0));
const upperSpace = (canvas.height - canvas.width) / 2;

let score = 0;
let gameOverChecker = false;

let touchStartX, touchStartY, touchEndX, touchEndY;

function initializeGame() {
    addRandomTile();
    addRandomTile();
    /*board[0][1] = 4;
    board[0][2] = 2;
    board[0][3] = 2;

    board[1][0] = 4;
    board[2][0] = 2;
    board[3][0] = 2;*/

    drawBoard();
}

function resetGame() {
    score = 0;
    gameOverChecker = false;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            board[i][j] = 0;
        }
    }
}    

function addRandomTile() {
    const availableTiles = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) {
                availableTiles.push({ x: i, y: j });
            }
        }
    }

    if (availableTiles.length > 0) {
        const { x, y } = availableTiles[Math.floor(Math.random() * availableTiles.length)];
        board[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
    else {
      gameOver();
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
        // Hier sollte der Neustart-Code stehen
        resetGame();
        initializeGame();
    });
}


function drawTile(x, y, value) {
    const tileX = x * tileSize;
    const tileY = y * tileSize + upperSpace;

    ctx.fillStyle = tileColor(value);
    ctx.fillRect(tileX, tileY, tileSize, tileSize);

    ctx.strokeStyle = "#776E65"; // You can choose a color for the outline
    ctx.strokeRect(tileX, tileY, tileSize, tileSize);

    ctx.font = "30px Arial";
    ctx.fillStyle = textColor(value);
    ctx.textAlign = "center";
    ctx.fillText(value, tileX + tileSize / 2, tileY + tileSize / 2 + 10);
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const value = board[i][j];
            score = Math.max(score, value);
            drawTile(j, i, value);
        }
    }
    drawScore();
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, canvas.width / 2, 30);
}

function tileColor(value) {
    switch (value) {
        case 2: return "#EEE4DA";
        case 4: return "#EDE0C8";
        case 8: return "#F2B179"; 
        case 16: return "#F59563";
        case 32: return "#F67C5F";
        case 64: return "#F65E3B";
        case 128: return "#EDCF72";
        case 256: return "#EDCC61";
        case 512: return "#EDC850";
        case 1024: return "#EDC53F";
        case 2048: return "#EDC22E";
        default: return "white"; // default: return "white";
    }
}

function textColor(value) {
    // Define text colors based on the tile value
    // You can customize these colors as you like
    return value <= 4 ? "#776E65" : "white";
}

canvas.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchend", function (event) {
  let direction;
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;

  // Berechnen Sie die horizontalen und vertikalen Unterschiede
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Bestimmen Sie die Richtung basierend auf den Unterschieden
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontale Bewegung
      if (deltaX > 0) {
        direction = "right";
    } else {
        direction = "left";
    }
  } else {
      // Vertikale Bewegung
      if (deltaY > 0) {
        direction = "down";
    } else {
        direction = "up";
    }
  }
  move(direction);
});


document.addEventListener("keydown", function (event) {
  let direction;
  switch (event.key) {
      case "ArrowUp":
          direction = "up";
          break;
      case "ArrowDown":
          direction = "down";
          break;
      case "ArrowLeft":
          direction = "left";
          break;
      case "ArrowRight":
          direction = "right";
          break;
      default:
          return; // Wenn keine Pfeiltaste gedrückt wurde, verlassen Sie die Funktion
  }
  
  move(direction);
});

function move(direction) {
    if (!gameOverChecker) {
        switch (direction) {
            case "up":
              moveUp();
              break;
            case "down":
              moveDown();
              break;
            case "left":
              moveLeft();
              break;
            case "right":
              moveRight();
              break;
        }
      
        addRandomTile();
        drawBoard();
    }
}

function moveUp() {
  for (let col = 0; col < gridSize; col++) {
      for (let row = 1; row < gridSize; row++) {
          if (board[row][col] !== 0) {
              let newRow = row;
              while (newRow > 0) {
                  if (board[newRow - 1][col] === 0) {
                      board[newRow - 1][col] = board[newRow][col];
                      board[newRow][col] = 0;
                      newRow--;
                  } else if (board[newRow - 1][col] === board[newRow][col]) {
                      // Fusioniere zwei Tiles
                      board[newRow - 1][col] *= 2;
                      board[newRow][col] = 0;
                      // Hier können Sie den Punktestand aktualisieren
                      newRow = 0; // Beende die Schleife
                  } else {
                      // Tile kann nicht weiter verschoben werden
                      newRow = 0; // Beende die Schleife
                  }
              }
          }
      }
  }
}

function moveDown() {
  for (let col = 0; col < gridSize; col++) {
      for (let row = gridSize - 2; row >= 0; row--) {
          if (board[row][col] !== 0) {
              let newRow = row;
              while (newRow < gridSize - 1) {
                  if (board[newRow + 1][col] === 0) {
                      // Verschiebe das Tile nach unten
                      board[newRow + 1][col] = board[newRow][col];
                      board[newRow][col] = 0;
                      newRow++;
                  } else if (board[newRow + 1][col] === board[newRow][col]) {
                      // Fusioniere zwei Tiles
                      board[newRow + 1][col] *= 2;
                      board[newRow][col] = 0;
                      // Hier können Sie den Punktestand aktualisieren
                      newRow = gridSize - 1; // Beende die Schleife
                  } else {
                      // Tile kann nicht weiter verschoben werden
                      newRow = gridSize - 1; // Beende die Schleife
                  }
              }
          }
      }
  }
}

function moveLeft() {
  for (let row = 0; row < gridSize; row++) {
      for (let col = 1; col < gridSize; col++) {
          if (board[row][col] !== 0) {
              let newCol = col;
              while (newCol > 0) {
                  if (board[row][newCol - 1] === 0) {
                      // Verschiebe das Tile nach links
                      board[row][newCol - 1] = board[row][newCol];
                      board[row][newCol] = 0;
                      newCol--;
                  } else if (board[row][newCol - 1] === board[row][newCol]) {
                      // Fusioniere zwei Tiles
                      board[row][newCol - 1] *= 2;
                      board[row][newCol] = 0;
                      // Hier können Sie den Punktestand aktualisieren
                      newCol = 0; // Beende die Schleife
                  } else {
                      // Tile kann nicht weiter verschoben werden
                      newCol = 0; // Beende die Schleife
                  }
              }
          }
      }
  }
}

function moveRight() {
  for (let row = 0; row < gridSize; row++) {
      for (let col = gridSize - 2; col >= 0; col--) {
          if (board[row][col] !== 0) {
              let newCol = col;
              while (newCol < gridSize - 1) {
                  if (board[row][newCol + 1] === 0) {
                      // Verschiebe das Tile nach rechts
                      board[row][newCol + 1] = board[row][newCol];
                      board[row][newCol] = 0;
                      newCol++;
                  } else if (board[row][newCol + 1] === board[row][newCol]) {
                      // Fusioniere zwei Tiles
                      board[row][newCol + 1] *= 2;
                      board[row][newCol] = 0;
                      // Hier können Sie den Punktestand aktualisieren
                      newCol = gridSize - 1; // Beende die Schleife
                  } else {
                      // Tile kann nicht weiter verschoben werden
                      newCol = gridSize - 1; // Beende die Schleife
                  }
              }
          }
      }
  }
}
initializeGame();