import { isColliding, isCollidingWithWalls } from "./collision.js";
import { createPlayer, movePlayer, clampPlayer } from "./player.js";
import { createEnemy, moveEnemy, clampEnemy } from "./enemy.js";
import { GAME_STATE, validateSpawns, drawScene } from "./game.js";

const canvas = document.getElementById("gameCanvas"); // lấy thẻ canvas từ HTML

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas element with id 'gameCanvas' was not found."); // báo lỗi nếu không tìm thấy canvas
}

const ctx = canvas.getContext("2d"); // ngòi bút vẽ 2d

if (!ctx) {
  throw new Error("2D rendering context is not supported in this browser."); // báo lỗi nếu trình duyệt không hỗ trợ Canvas 2D
}

const PLAYER_SIZE = 40;
const BASE_OBSTACLE_SPEED = 3.5;
const MAX_OBSTACLE_SPEED = 6;
const BASE_SPAWN_RATE = 120;
const MIN_SPAWN_RATE = 60;
const INVINCIBLE_FRAMES = 60;

let gameState = GAME_STATE.PLAYING; // "playing" | "gameover"
let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;
let level = 1;
let spawnRate = BASE_SPAWN_RATE;
let frameCount = 0;
let enemyEscapeTimer = 0;
let invincibleTimer = INVINCIBLE_FRAMES;

const player = createPlayer(PLAYER_SIZE);

const walls = [ // tạo cái hộp, có độ right, left, top, bottom
  { x: 200, y: 100, width: 400, height: 40 },
  { x: 200, y: 300, width: 400, height: 40 },
  { x: 200, y: 100, width: 40, height: 240 },
  { x: 560, y: 100, width: 40, height: 240 },
];

const enemy = createEnemy(PLAYER_SIZE, player.speed);

const keys = {}; // lưu trạng thái phím đang giữ

function getLevelFromScore(currentScore) {
  if (currentScore >= 1500) return 4;
  if (currentScore >= 800) return 3;
  if (currentScore >= 300) return 2;
  return 1;
}

function updateDifficulty() {
  const obstacleSpeed = BASE_OBSTACLE_SPEED + Math.sqrt(score) * 0.05;
  enemy.speed = Math.min(obstacleSpeed, MAX_OBSTACLE_SPEED);

  spawnRate = BASE_SPAWN_RATE - Math.floor(score / 100);
  spawnRate = Math.max(spawnRate, MIN_SPAWN_RATE);

  level = getLevelFromScore(score);
}

function resetGame() {
  // reset đúng thứ tự cho block 5
  score = 0;
  level = 1;
  enemy.speed = BASE_OBSTACLE_SPEED;
  spawnRate = BASE_SPAWN_RATE;
  frameCount = 0;
  enemyEscapeTimer = 0;
  invincibleTimer = INVINCIBLE_FRAMES;
  gameState = GAME_STATE.PLAYING;

  Object.keys(keys).forEach((key) => {
    keys[key] = false;
  });

  Object.assign(player, createPlayer(PLAYER_SIZE));
  Object.assign(enemy, createEnemy(PLAYER_SIZE, player.speed));
  enemy.speed = BASE_OBSTACLE_SPEED;

  validateSpawns(player, enemy, walls, isCollidingWithWalls);
}

window.addEventListener("keydown", (e) => {
  // nhấn key
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key; // nếu caps hoặc shift sẽ chuyển thành lowercase
  keys[key] = true;

  if (gameState === GAME_STATE.GAMEOVER && key === "r") { // restart game
    resetGame();
  }
});

window.addEventListener("keyup", (e) => {
  // thả key
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys[key] = false;
});

function checkGameOver() {
  if (isColliding(player, enemy)) {
    gameState = GAME_STATE.GAMEOVER;
  }
}

function update() {
  if (gameState !== GAME_STATE.PLAYING) {
    return;
  }

  frameCount += 1;
  score += 1;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", String(highScore));
  }
  enemyEscapeTimer += 1;
  updateDifficulty();

  movePlayer(player, keys, walls, isCollidingWithWalls); // xử lý di chuyển player và va chạm với tường
  const canEscape = enemyEscapeTimer >= spawnRate;
  const usedEscape = moveEnemy(enemy, player, walls, isCollidingWithWalls, canEscape); // xử lý enemy đuổi theo player
  if (usedEscape) {
    enemyEscapeTimer = 0;
  }

  clampEnemy(enemy, canvas); // giữ enemy trong màn hình
  if (invincibleTimer > 0) {
    invincibleTimer -= 1;
  } else {
    checkGameOver(); // kiểm tra điều kiện thua
  }
  clampPlayer(player, canvas); // giữ player trong màn hình
}

function draw() {
  drawScene(ctx, canvas, walls, enemy, player, gameState, {
    score,
    highScore,
    level,
    spawnRate,
    speed: enemy.speed,
    invincibleTimer,
  });
}

function gameLoop() {
  update(); // xử lý logic
  draw(); // render
  requestAnimationFrame(gameLoop); // lặp theo nhịp browser
}

resetGame();
gameLoop();

// flow engine block 5+
// INPUT -> movePlayer() -> moveEnemy() -> checkGameOver() -> clampPlayer() -> draw()
