export function createEnemy(playerSize, playerSpeed) {
  return {
    x: 500, // spawn trong maze để có thể đuổi player
    y: 200,
    width: playerSize,
    height: playerSize,
    speed: playerSpeed - 0.5,
  };
}

export function moveEnemy(
  enemy,
  player,
  walls,
  isCollidingWithWalls,
  canAttemptEscape = true,
) {
  let dx = player.x - enemy.x;
  let dy = player.y - enemy.y;

  const length = Math.sqrt(dx * dx + dy * dy);

  if (length === 0) {
    return false;
  }

  dx = (dx / length) * enemy.speed;
  dy = (dy / length) * enemy.speed;

  const prevX = enemy.x;
  const prevY = enemy.y;

  // --- X AXIS ---
  enemy.x += dx;
  if (isCollidingWithWalls(enemy, walls)) {
    enemy.x -= dx;
  }

  // --- Y AXIS ---
  enemy.y += dy;
  if (isCollidingWithWalls(enemy, walls)) {
    enemy.y -= dy;
  }

  const isStuck = enemy.x === prevX && enemy.y === prevY;
  if (!isStuck || !canAttemptEscape) {
    return false;
  }

  // Nếu enemy bị kẹt, cho random thoát góc
  const randomX = (Math.random() - 0.5) * 10;
  const randomY = (Math.random() - 0.5) * 10;

  enemy.x += randomX;
  enemy.y += randomY;

  if (isCollidingWithWalls(enemy, walls)) {
    enemy.x -= randomX;
    enemy.y -= randomY;
  }

  return true;
}

export function clampEnemy(enemy, canvas) {
  enemy.x = Math.max(0, Math.min(canvas.width - enemy.width, enemy.x)); // giới hạn enemy theo trục x trong canvas
  enemy.y = Math.max(0, Math.min(canvas.height - enemy.height, enemy.y)); // giới hạn enemy theo trục y trong canvas
}
