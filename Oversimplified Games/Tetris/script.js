const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
context.width = 405;
context.height = 648;

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
const arena = createMatrix(10,10); 
const colors = ["black", "green", "blue", "red", "orange", "yellow", "purple", "white"];

matrixs = [[[1,1,1],[0, 1, 0]],
           [[0, 2], [0, 2], [2,2]],
           [[3], [3], [3,3]],
           [[0,4,4],[4,4]],
           [[5,5,5],[0,5]],
           [[6,6],[0,6,6]],
           [[7],[7],[7],[7]]]

const player = {
    matrix: matrixs[Math.floor(Math.random() * matrixs.length)], 
    pos: {
        x: 5,
        y: 0 
    },
    score: 0
};

function arenaSweep() {
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += 10;
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawScore();
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "1px Arial";
    context.fillText(player.score, 7, 1);
}

function drawMatrix(matrix, offset) {
    sizeh = canvas.height/10;
    sizew = canvas.width/10;

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect((x + offset.x)*sizew,
                                 (y + offset.y) * sizeh,
                                 sizew, sizeh);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function update(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score-display').innerText = player.score;
}

function playerReset() {
    player.pos.x = 5;
    player.pos.y = 0;
    player.matrix = matrixs[Math.floor(Math.random() * matrixs.length)];
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 81) {
        playerRotate(-1);
    } else if (event.keyCode === 87) {
        playerRotate(1);
    }
});

update();