export const GAME_STATE = {
  PLAYING: "playing",
  GAMEOVER: "gameover",
};

function getBackgroundByLevel(level) {
  if (level >= 4) return "#131722";
  if (level === 3) return "#151a26";
  if (level === 2) return "#171d2b";
  return "#1a1a1a";
}

export function validateSpawns(player, enemy, walls, isCollidingWithWalls) {
  // kiểm tra xem player và enemy có kẹt tường không
  if (isCollidingWithWalls(player, walls)) {
    console.error("Player spawned inside wall!");
  }

  if (isCollidingWithWalls(enemy, walls)) {
    console.error("Enemy spawned inside wall!");
  }
}

export function drawDebugBox(ctx, entity, color = "white") {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
}

export function drawScene(ctx, canvas, walls, enemy, player, gameState, ui) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // xóa khung hình cũ
  ctx.fillStyle = getBackgroundByLevel(ui.level);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ef476f"; // màu tường
  for (const wall of walls) {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height); // vẽ tường
  }

  ctx.fillStyle = "#ff006e"; // màu enemy
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height); // vẽ enemy

  ctx.fillStyle = "#4cc9f0"; // màu player
  ctx.fillRect(player.x, player.y, player.width, player.height); // vẽ player
  drawDebugBox(ctx, player, "cyan"); // debug hitbox player
  drawDebugBox(ctx, enemy, "red"); // debug hitbox enemy

  ctx.fillStyle = "#ffffff";
  ctx.font = "18px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${ui.score}`, 16, 28);
  ctx.fillText(`Level: ${ui.level}`, 16, 52);
  ctx.fillText(`Best: ${ui.highScore}`, 16, 76);
  if (ui.invincibleTimer > 0) {
    ctx.fillText("Shield: ON", 16, 100);
  }

  if (gameState === GAME_STATE.GAMEOVER) {
    ctx.fillStyle = "black";
    ctx.font = "60px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 60);
  }
}
