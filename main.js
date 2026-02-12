const canvas = document.getElementById("gameCanvas"); // lấy thẻ canvas từ HTML

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Canvas element with id 'gameCanvas' was not found."); // báo lỗi nếu không tìm thấy canvas
}

const ctx = canvas.getContext("2d"); // ngòi bút vẽ 2d

if (!ctx) {
  throw new Error("2D rendering context is not supported in this browser."); // báo lỗi nếu trình duyệt không hỗ trợ Canvas 2D
}

const PLAYER_SIZE = 40;

const player = {
  x: (canvas.width - PLAYER_SIZE) / 2,
  y: (canvas.height - PLAYER_SIZE) / 2,
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  speed: 4,
};

const keys = {}; // lưu trạng thái phím đang giữ

window.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys[key] = false;
});

function handleMovement() {
  if (keys["ArrowUp"] || keys["w"]) {
    player.y -= player.speed;
  } else if (keys["ArrowDown"] || keys["s"]) {
    player.y += player.speed;
  } else if (keys["ArrowLeft"] || keys["a"]) {
    player.x -= player.speed;
  } else if (keys["ArrowRight"] || keys["d"]) {
    player.x += player.speed;
  }
}

function clampPlayer() {
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x)); // giới hạn player theo trục x trong canvas
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y)); // giới hạn player theo trục y trong canvas
}

function update() {
  handleMovement(); // xử lý di chuyển
  clampPlayer(); // giữ player trong màn hình
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // xóa khung hình cũ
  ctx.fillStyle = "#4cc9f0"; // màu player
  ctx.fillRect(player.x, player.y, player.width, player.height); // vẽ player
}

function gameLoop() {
  update(); // xử lý logic
  draw(); // render
  requestAnimationFrame(gameLoop); // lặp theo nhịp browser
}

gameLoop();
