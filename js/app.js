// Enemies our player must avoid
var Enemy = function(enemyInitLocX, enemyInitLocY, enemySpeed) {
    this.x = enemyInitLocX;
    this.y = enemyInitLocY;
    this.speed = enemySpeed;

    // The image/sprite for our enemies, this uses
    // a helper provided to easily load images.
    this.sprite = 'images/enemy-bug.png';
}

// Updates the enemy's position, required method for game
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {

    // Multiplying any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -60;
    }

    var enemyLeftX = this.x - 50;
    var enemyRightX = this.x + 50;
    var enemyTopY = this.y - 50;
    var enemyBottomY = this.y + 50;

    if (player.x > enemyLeftX && player.x < enemyRightX && player.y > enemyTopY && player.y < enemyBottomY) {
        player.resetPlayerPosition();
    }
}

// Draws the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.variableSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiply;
}

// Player's initial location at beginning of game.
var playerInitLocX = 202;
var playerInitLocY = 400;

var Player = function() {
    this.x = playerInitLocX;
    this.y = playerInitLocY;
    this.playerScore = 0;
    this.playerHealth = 10;

    // The image/sprite for our player, this uses
    // a helper provided to easily load images.
    this.sprite = 'images/char-boy.png';
}

// Updates the player's position and displays score and player health.
Player.prototype.update = function() {
        document.getElementById('score').innerHTML = this.playerScore;
        document.getElementById('health').innerHTML = this.playerHealth;
    }
    // Draws the player on the screen, required method for game.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Resets player to beginning location and deducts one point
// from Health when player collides with an enemy.
Player.prototype.resetPlayerPosition = function() {
    this.x = playerInitLocX;
    this.y = playerInitLocY;

    // TODO: action item.  Update code to allow for game restart
    // after playerHealth drops below 0.
    this.playerHealth = this.playerHealth - 1;
};

Player.prototype.handleInput = function(keyPressed) {
    var stepLengthX = 100;
    var stepLengthY = 90;

    if (keyPressed === 'left') {
        if (this.x <= 50) {
            return null;
        }
        this.x -= stepLengthX;
    } else if (keyPressed === 'right') {
        if (this.x >= 400) {
            return null;
        }
        this.x += stepLengthX;
    } else if (keyPressed === 'up') {
        if (this.y <= 50) {
            this.resetPlayerPosition();

            // Adds a point to player's Score and also Health
            // when player successfully reaches the water.
            this.playerScore = this.playerScore + 1;
            this.playerHealth = this.playerHealth + 1 + 1;
            return null;
        }
        this.y -= stepLengthY;
    } else if (keyPressed === 'down') {
        if (this.y >= 400) {
            return null;
        }
        this.y += stepLengthY;
    } else {
        return null;
    }
}

// Instantiating objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
}

var player = new Player();

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'

    };
    var keyPressed = allowedKeys[e.keyCode];
    player.handleInput(keyPressed);
});