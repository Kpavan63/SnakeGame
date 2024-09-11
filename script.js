const gameBoard = document.getElementById('game-board');
const popup = document.getElementById('popup');
const welcomePopup = document.getElementById('welcome-popup');
const gameOverPopup = document.getElementById('game-over-popup');
const resetBtn = document.getElementById('reset-btn');
const scoreElement = document.getElementById('score');
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let gameOver = false;
let speed = 300;  // Default speed (Easy)
let gameInterval;
let score = 0;

// Show welcome popup on page load
window.onload = function() {
    welcomePopup.style.display = 'block';
}


// Draw the snake on the game board
function drawSnake() {
    gameBoard.innerHTML = ''; // Clear previous state
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * boardSize}px`;
        snakeElement.style.top = `${segment.y * boardSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

// Draw the food
function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * boardSize}px`;
    foodElement.style.top = `${food.y * boardSize}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// Update the snake's movement
function updateSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        updateScore();
        generateFood();
    } else {
        snake.pop(); // Remove the tail unless snake eats food
    }
}

// Generate a new food item at a random position
function generateFood() {
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
}

// Update the score on the screen
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Check for game over conditions
function checkGameOver() {
    if (snake[0].x < 0 || snake[0].x >= 20 || snake[0].y < 0 || snake[0].y >= 20) {
        gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            gameOver = true;
        }
    }
}

// Main game loop
function gameLoop() {
    if (gameOver) {
        showGameOver();
        return;
    }
    
    updateSnake();
    checkGameOver();
    drawSnake();
    drawFood();
}

// Start the game with selected speed
function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed); // Set game speed
    welcomePopup.style.display = 'none'; // Hide the welcome popup
    popup.style.display = 'none'; // Hide the difficulty popup
}

// Show the game over popup
function showGameOver() {
    clearInterval(gameInterval);
    gameOverPopup.style.display = 'block';
}

// Reset the game
function resetGame() {
    window.location.reload(); // Reload the page to reset
}

// Key Controls for snake movement
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
    }
});

// Control buttons for mobile
document.getElementById('up-btn').addEventListener('click', () => {
    if (direction.y !== 1) direction = { x: 0, y: -1 };
});

document.getElementById('down-btn').addEventListener('click', () => {
    if (direction.y !== -1) direction = { x: 0, y: 1 };
});

document.getElementById('left-btn').addEventListener('click', () => {
    if (direction.x !== 1) direction = { x: -1, y: 0 };
});

document.getElementById('right-btn').addEventListener('click', () => {
    if (direction.x !== -1) direction = { x: 1, y: 0 };
});

// Set speed and start the game when difficulty is selected
document.getElementById('easy-btn').addEventListener('click', () => {
    speed = 300;  // Slow speed
    popup.style.display = 'none'; // Hide the popup
    startGame();
});

document.getElementById('medium-btn').addEventListener('click', () => {
    speed = 150;  // Medium speed
    popup.style.display = 'none'; // Hide the popup
    startGame();
});

document.getElementById('hard-btn').addEventListener('click', () => {
    speed = 75;  // Fast speed
    popup.style.display = 'none'; // Hide the popup
    startGame();
});

// Reset the game
resetBtn.addEventListener('click', resetGame);

// Show the welcome popup
document.getElementById('start-game-btn').addEventListener('click', () => {
    welcomePopup.style.display = 'none';
    popup.style.display = 'block'; // Show difficulty popup after welcome
});

// Try again button on game over
document.getElementById('try-again-btn').addEventListener('click', () => {
    gameOverPopup.style.display = 'none';
    resetGame();
});
