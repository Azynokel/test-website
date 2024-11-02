const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.height = 648; 
canvas.width = 405;  
let particles = [];
let muted = false;

class Player {
    constructor() {
        this.x = canvas.width / 2 - 40 / 2;
        this.y = canvas.height - 40 - 40;
        this.width = 40;
        this.height = 40;
        this.speed = 5;
        this.movingLeft = false;
        this.movingRight = false;
        this.lives = 5;
        this.shootDown = 30;
        this.image = document.createElement('img');
        this.image.src = './Images/player.png';
        this.soundHit = new Audio('./Sounds/hit.wav');
        this.soundShoot = new Audio('./Sounds/laserShoot.wav');
    }

    move(deltaTime) {
        this.x += this.speed * (this.movingRight - this.movingLeft) * deltaTime;
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width; 
        }
    }

    shoot(bullets) {
        const bullet = new Bullet();
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y + player.height / 2 - 25 - bullet.height / 2;
        bullets.push(bullet);
    }

    collisionDetection(bulletsEnemy) {
        for (let i = 0; i < bulletsEnemy.length; i++) {
            const bullet = bulletsEnemy[i];
            if (
                bullet.x < this.x + this.width &&
                bullet.x + bullet.width > this.x &&
                bullet.y < this.y + this.height &&
                bullet.y + bullet.height > this.y
            ) {
                bulletsEnemy.splice(i, 1);
                this.lives -= 1;
                if (!muted) {         
                    this.soundHit.play();
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        //ctx.fillRect(this.x - 5, this.y - 5, this.width + 5, this.height + 5);
        ctx.drawImage(this.image, this.x-20, this.y-20, this.width + 40, this.height+40);
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.lives, this.x + 15, this.y + 65);
    }
}

class Invader {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 69;
        this.height = 69;
        this.lives = 1;
        this.speed = 0;
        this.shootDown = 0;
        this.image = document.createElement('img');
        this.image.src = './Images/enemy.png';
        this.soundExplosion = new Audio('./Sounds/explosion.wav');
    }

    move(deltaTime) {
        this.y += this.speed * deltaTime;
    }

    collisionDetection(bullets) {
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            if (
                bullet.x < this.x + this.width &&
                bullet.x + bullet.width > this.x &&
                bullet.y < this.y + this.height &&
                bullet.y + bullet.height > this.y
            ) {
                bullets.splice(i, 1);
                this.lives -= 1;
            }
        }
    }

    shoot(bullets) {
        const bullet = new BulletEnemy();
        bullet.x = this.x + this.width / 2 - bullet.width / 2;
        bullet.y = this.y + this.height / 2 + 5 - bullet.height / 2;
        bullets.push(bullet);
    }

    draw(ctx) {
        if (this.lives === 1 || this.lives === 0) {
            ctx.fillStyle = '#ff0000';
        } else if (this.lives === 2) {
            ctx.fillStyle = '#ff0066';
        } else if (this.lives === 3) {
            ctx.fillStyle = '#ff00aa';
        } else {
            ctx.fillStyle = '#ff00ff';
        }
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.lives > 1) {
            ctx.font = "15px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(this.lives, this.x + 31, this.y + 55);
        }
    }
}

class Bullet {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 12;
        this.height = 12;
        this.speed = 5;
        this.image = document.createElement('img');
        this.image.src = './Images/playerBullet.png';
    }

    move(deltaTime) {
        this.y -= this.speed * deltaTime;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class BulletEnemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 12;
        this.height = 12;
        this.speed = 3;
        this.image = document.createElement('img');
        this.image.src = './Images/enemyBullet.png';
    }

    move(deltaTime) {
        this.y += this.speed * deltaTime;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Particle {
    constructor(vx, vy) {
        this.lifetime = 40;
        this.age = 0;
        this.x = vx;
        this.y = vy;
        this.direction = Math.random() * 360;
        this.color = 'rgba(255, '+Math.floor(Math.random()*150)+', '+Math.floor(Math.random()*150)+', 1)';
        this.size = 1;
        this.speed = 2 + Math.random() * 4;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.age += 1;
        let dirRadian = this.direction * Math.PI / 180; 
        this.x += this.speed * Math.cos(dirRadian);
        this.y += this.speed * Math.sin(dirRadian);
        this.size += 0.2;
        this.speed = Math.max(0, this.speed - 0.1);
        this.color = this.changeAlpha(this.color, this.extractAlpha(this.color)-(1/this.lifetime));
    }
    extractAlpha(rgbaValue) {
        const alpha = parseFloat(rgbaValue.split(',')[3].trim().slice(0, -1));
        return alpha; 
    }
    changeAlpha(rgbaString, newAlpha) {
        const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([01]?(\.\d+)?)\)$/;
        const match = rgbaString.match(rgbaRegex);
      
        if (!match) {
          console.error('Ungültiges RGBA-Format');
          return rgbaString;
        }
      
        const [, r, g, b, currentAlpha] = match;
        newAlpha = Math.max(newAlpha, 0);
        newAlpha = Math.min(newAlpha, 1);
        const newRgbaString = `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
      
        return newRgbaString;
      }
}

function generateInvaders(level) {
    const output = [];
    const spacing = 10;
    let invaderWidth = new Invader().width;
    for (let x = 0; x < canvas.width / (invaderWidth + spacing) - 1; x++) {
        for (let y = 0; y < Math.min(level, maxRows); y++) {
            const invader = new Invader();
            invader.x = spacing + x * (invader.width + spacing);
            invader.y = spacing + y * (invader.height + spacing);
            invader.lives = Math.floor((level + (maxRows - y)) / 5); 
            invader.shootDown = genShootDown(invader.y);
            output.push(invader);
        }
    }
    return output;
}

function invaderExplosion(x, y) {
    for (var i = 1; i <= 50; i++) {
        const p = new Particle(x, y);
        particles.push(p);
    }
}

function genShootDown(y) {
    return Math.floor(Math.random() * (canvas.height - y) / 2) + 60;
}

function generateStars(n) {
    const output = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 1 + Math.random() * 2;
        output.push([x, y, size]);
    }
    return output;
}

function drawStars(stars, ctx) {
    stars.forEach(star => {
        const x = star[0];
        const y = star[1];
        const size = star[2];
        ctx.fillStyle = "yellow";
        ctx.fillRect(x, y, size, size);
    });
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
    gameOverChecker = false;
    level = 1;
    score = 0;
    bullets = [];
    invaders = [];
    bulletsEnemy = [];
    stars = [];
    cancelAnimationFrame(gameIntervall);
}

function initializeGame() {
    player = new Player();
    bullets = [];
    invaders = generateInvaders(level);
    bulletsEnemy = [];
    stars = generateStars(100);
    update(0);
}

function toggleMute() {
    muted = !muted;

    const muteButton = document.getElementById('muteButton');
    if (muted) {
        muteButton.src = 'Images/mute.png';
    } else {
        muteButton.src = 'Images/volume.png';
    }

    console.log('Muted:', muted);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        player.movingLeft = true;
    } else if (event.key === 'ArrowRight') {
        player.movingRight = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        player.movingLeft = false;
    } else if (event.key === 'ArrowRight') {
        player.movingRight = false;
    }
});

document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 0) {
        var touchX = event.touches[0].clientX;

        if (touchX < window.innerWidth / 3) {
            player.movingLeft = true;
        } else if (touchX > window.innerWidth / 3 * 2){
            player.movingRight = true;
        }
    }
});

document.addEventListener('touchend', function (event) {
    if (event.changedTouches.length > 0) {
        var touchX = event.changedTouches[0].clientX;

        if (touchX < window.innerWidth / 3) {
            player.movingLeft = false;
        } else if (touchX > window.innerWidth / 3 * 2) {
            player.movingRight = false;
        }
    }
});


function update(timestamp) {
    let deltaTime = (timestamp - lastTime) / 16;
    lastTime = timestamp;

    if (!gameOverChecker) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStars(stars, ctx);
        stars.forEach(star => {
            star[1] += 0.5 * deltaTime;
            if (star[1] > canvas.height) {
                star[1] = 0;
                star[0] = Math.random() * canvas.width;
            }
        });

        player.move(deltaTime);
        player.collisionDetection(bulletsEnemy);
        player.shootDown--;
        if (player.shootDown <= 0) {
            player.shootDown = 30;
            player.shoot(bullets);
            if (!muted) {         
                player.soundShoot.play();
            }
        }
        player.draw(ctx);
        if (player.lives <= 0) {
            gameOver();
        }
    
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            bullet.move(deltaTime);
            if (bullet.y < 0) {
                bullets.splice(i, 1);
            }
            bullet.draw(ctx);
        }
    
        for (let i = 0; i < invaders.length; i++) {
            const invader = invaders[i];
            invader.shootDown--;
            if (invader.shootDown <= 0) {
                invader.shootDown = genShootDown(invader.y);
                invader.shoot(bulletsEnemy);
            }
            invader.move(deltaTime);
            invader.collisionDetection(bullets);
            invader.draw(ctx);
            if (invader.lives <= 0) {
                invaders.splice(i, 1);
                invaderExplosion(invader.x+invader.width/2, invader.y+invader.height/2); 
                score++;
                if (!muted) {         
                    invader.soundExplosion.play();
                }
            }
        }
    
        for (let i = 0; i < bulletsEnemy.length; i++) {
            const bullet = bulletsEnemy[i];
            bullet.move(deltaTime);
            if (bullet.y > canvas.height) {
                bulletsEnemy.splice(i, 1);
            }
            bullet.draw(ctx);
        }

        if (invaders.length === 0) {
            level++;
            invaders = generateInvaders(level);
        }

        for (let i = 0; i < particles.length; i++) {
            part = particles[i];
            if (part.age == part.lifetime) {
                particles.splice(i, 1);
            } else {
                part.update(); 
                part.draw(ctx);
            }
        }    
        gameIntervall = requestAnimationFrame(update);
    }
}

let lastTime = 0;
let gameIntervall;
let gameOverChecker = false;
let level = 1;
let score = 0;
let player;
let bullets;
let invaders;
let bulletsEnemy;
let maxRows = 5;
let stars = generateStars(150);
initializeGame();