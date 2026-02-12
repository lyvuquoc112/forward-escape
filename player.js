export function createPlayer(playerSize) {
  return {
    x: 380, // tọa độ x spawn trong maze
    y: 180, // tọa độ y spawn trong maze
    width: playerSize, // độ rộng của player
    height: playerSize, // độ cao của player
    speed: 4, // tộc độ pixel/frame
  };
}

export function movePlayer(player, keys, walls, isCollidingWithWalls) {
  let dx = 0;
  let dy = 0;
  if (keys["ArrowUp"] || keys["w"]) {
    dy -= player.speed;
  }
  if (keys["ArrowDown"] || keys["s"]) {
    dy += player.speed;
  }
  if (keys["ArrowLeft"] || keys["a"]) {
    dx -= player.speed;
  }
  if (keys["ArrowRight"] || keys["d"]) {
    dx += player.speed;
  }

  // --- X AXIS ---
  player.x += dx; // vị trí của user cộng khoảng cách đi, x

  if (isCollidingWithWalls(player, walls)) {
    // nếu đụng tường
    player.x -= dx; // revert X
  }

  // --- Y AXIS ---
  player.y += dy; // vị trí của user cộng khoảng cách đi, y

  if (isCollidingWithWalls(player, walls)) {
    // nếu đụng tường
    player.y -= dy; // revert Y
  }
}

export function clampPlayer(player, canvas) {
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x)); // giới hạn player theo trục x trong canvas
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y)); // giới hạn player theo trục y trong canvas
}
