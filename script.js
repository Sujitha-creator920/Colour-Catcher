let targetColor = '';
let score = 0;
let highScore = 0;
let timer = 30; // For timer mode
let gameInterval, timerInterval;
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

// Utility: Get a random color
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Update Score
function updateScore() {
  document.getElementById('score-value').innerText = score;
  if (score > highScore) {
    highScore = score;
    document.getElementById('high-score-value').innerText = highScore;
   
  }
}

// Spawn Object
function spawnObject() {
  const gameArea = document.getElementById('game-area');
  const object = document.createElement('div');
  const randomColor = getRandomColor();

  object.classList.add('object');
  object.style.backgroundColor = randomColor;
  object.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
  object.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';

  object.addEventListener('click', () => {
    if (randomColor === targetColor) {
      score += 10;
      updateScore();
    } else {
      score -= 5;
      updateScore();
    }
    object.remove();
  });

  gameArea.appendChild(object);

  // Remove object after it fades out
  setTimeout(() => {
    object.remove();
  }, 2000);
}

// Start Standard Game
function startGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  score = 0;
  timer = 30;
  updateScore();
  targetColor = getRandomColor();
  document.getElementById('target').innerText = targetColor;
  document.getElementById('timer-display').style.display = 'none';

  gameInterval = setInterval(() => {
    spawnObject();
    if (document.getElementById('game-area').childElementCount >= 10) {
      clearInterval(gameInterval);
      alert('Game Over! Final Score: ' + score);
    }
  }, 1000);
}

// Start Timer Mode
function startTimerMode() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  score = 0;
  timer = 30;
  updateScore();
  targetColor = getRandomColor();
  document.getElementById('target').innerText = targetColor;
  document.getElementById('timer-display').style.display = 'block';
  document.getElementById('time-left').innerText = timer;

  gameInterval = setInterval(() => {
    spawnObject();
  }, 1000);

  timerInterval = setInterval(() => {
    timer -= 1;
    document.getElementById('time-left').innerText = timer;
    if (timer === 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      alert('Time’s up! Final Score: ' + score);
    }
  }, 1000);
}

// Start the game on load
window.onload = startGame;
