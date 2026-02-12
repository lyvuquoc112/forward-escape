# Forward Escape

A simple top-down HTML5 Canvas game built in 1 week.

## 🎮 Current Version
Engine v0.3 – Structured & Extendable

Block 1:
- Canvas 800x600
- Player rendering
- GitHub Pages deployment
- Clean console

Block 2:
- Game loop using requestAnimationFrame
- 4-direction movement (WASD / Arrow keys)
- Boundary constraint (player cannot leave screen)
- Clean input handling system

Block 3 – Player Movement & Game Loop
📌 Overview

Block 3 đánh dấu việc hoàn thiện nền tảng cơ bản của game:

Canvas rendering

Player object

Keyboard input system

Game loop sử dụng requestAnimationFrame

Hệ thống cập nhật và vẽ tách riêng (update() / draw())

Đây là bước chuyển từ "vẽ thử nghiệm" sang "game engine mini".

🎯 Mục tiêu Block 3

Xây dựng hệ thống điều khiển Player bằng bàn phím

Tạo game loop mượt theo FPS của browser

Tách logic game khỏi phần render

Chuẩn hóa cấu trúc engine cơ bản

🧠 Kiến trúc Game Engine
Game Loop Flow
INPUT
  ↓
update()
  ↓
draw()
  ↓
requestAnimationFrame()

🧱 Core Components
1️⃣ Canvas Setup

Lấy canvas từ DOM

Lấy 2D rendering context

Validate browser support

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

2️⃣ Player Object
const player = {
  x: centerX,
  y: centerY,
  width: 40,
  height: 40,
  speed: 4
};


Player được spawn ở giữa canvas.

3️⃣ Input System

Lưu trạng thái phím đang giữ bằng object keys

Hỗ trợ:

Arrow keys

WASD

const keys = {};


Hệ thống này cho phép:

Giữ phím để di chuyển liên tục

Không phụ thuộc key repeat rate

4️⃣ Movement Logic

Tính dx, dy

Cộng vào vị trí player mỗi frame

player.x += dx;
player.y += dy;


Tách riêng xử lý X và Y để chuẩn bị cho collision ở Block sau.

5️⃣ Update Function
function update() {
  movePlayer();
}


Chỉ xử lý logic game, không vẽ.

6️⃣ Draw Function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(player.x, player.y, player.width, player.height);
}


Chỉ xử lý render.

7️⃣ Game Loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}


Đây là vòng lặp chính của game.

🎮 Controls
Key	Action
W / ArrowUp	Move Up
S / ArrowDown	Move Down
A / ArrowLeft	Move Left
D / ArrowRight	Move Right
🧪 Testing Checklist

✔ Player xuất hiện ở giữa màn hình
✔ Player di chuyển mượt khi giữ phím
✔ Không bị giật lag
✔ Game loop chạy liên tục

📈 Từ Block 3 sang Block 4

Block 3 tạo nền tảng cho:

Collision detection (AABB)

Maze system

Enemy AI

Game states (win / lose)

🏗 Architecture Pattern

Block 3 tuân theo mô hình:

Input → Update → Render

Đây là pattern chuẩn của hầu hết game engine 2D.

Block 4 – Maze, Enemy AI & Collision System
📌 Overview

Block 4 mở rộng nền tảng từ Block 3 bằng cách bổ sung:

Maze (Wall System)

Collision Detection (AABB)

Enemy AI (Vector-based chasing)

Game State Management

Debug Hitbox Visualization

Modular Code Structure

Game giờ đã có:

Threat + Environment + Failure State

🎯 Objectives

Implement wall-based maze

Prevent player from passing through walls

Create enemy that chases player

Handle collision resolution cleanly

Add Game Over state

Improve architecture with modular structure

🧱 Architecture
🔁 Game Loop
INPUT
 ↓
movePlayer()
 ↓
moveEnemy()
 ↓
clampEnemy()
 ↓
checkGameOver()
 ↓
clampPlayer()
 ↓
draw()


Game loop sử dụng:

requestAnimationFrame()


Đảm bảo rendering mượt theo FPS browser.

🧩 Core Systems
1️⃣ Maze System

Maze được tạo bằng các wall object:

const walls = [
  { x, y, width, height }
];


Walls tạo thành một khu vực hộp kín.

2️⃣ Collision System (AABB)

Sử dụng Axis-Aligned Bounding Box:

function isColliding(a, b)


Logic:

left < right &&
right > left &&
top < bottom &&
bottom > top


Áp dụng cho:

Player ↔ Wall

Enemy ↔ Wall

Player ↔ Enemy

3️⃣ Axis-Separated Collision Resolution

Di chuyển tách riêng theo X và Y:

// X
player.x += dx
if (collision) revert

// Y
player.y += dy
if (collision) revert


Giúp tránh kẹt góc và glitch xuyên tường.

4️⃣ Enemy AI – Vector Normalize

Enemy di chuyển bằng cách tính vector hướng tới player:

dx = player.x - enemy.x
dy = player.y - enemy.y
length = sqrt(dx² + dy²)

dx = (dx / length) * speed
dy = (dy / length) * speed


Ưu điểm:

Không tăng tốc khi đi chéo

Di chuyển mượt và tự nhiên

5️⃣ Anti-Stuck Mechanism

Nếu enemy không thể di chuyển:

if (enemy.x === prevX && enemy.y === prevY)


Áp dụng random offset nhỏ để thoát góc.

6️⃣ Game State System
let gameState = "playing"


Trạng thái:

playing

gameover

Giúp tách logic gameplay khỏi rendering.

7️⃣ Clamp System

Giữ entity trong canvas:

clampPlayer()
clampEnemy()

8️⃣ Debug Hitbox

Thêm visual collider overlay:

drawDebugBox(entity)


Giúp:

Debug va chạm

Kiểm tra spawn

Phát hiện lỗi geometry

Đây là công cụ chuẩn trong phát triển game.

🧩 Modular Refactor

Sau Block 4, project được tách thành các module:

player.js
enemy.js
collision.js
maze.js
game.js


Lợi ích:

Code dễ maintain

Dễ mở rộng

Tách biệt responsibility

🎮 Controls
Key	Action
W / ArrowUp	Move Up
S / ArrowDown	Move Down
A / ArrowLeft	Move Left
D / ArrowRight	Move Right
R	Restart (Game Over)
🧪 Validation Checklist

✔ Player không xuyên tường
✔ Enemy không xuyên tường
✔ Enemy đuổi mượt
✔ Không tăng tốc khi đi chéo
✔ Không kẹt góc
✔ Game Over hiển thị đúng
✔ Restart hoạt động
✔ Debug hitbox hiển thị chính xác

🧠 Design Impact

Block 4 đánh dấu bước chuyển từ:

Demo movement → Mini game engine có threat + environment

Game hiện tại đã có:

Movement system

Physics-like collision

AI chasing

Failure condition

Block 5 – Arcade Light Difficulty & Progression System
🎯 Mục tiêu Block 5

Xây dựng hệ thống tăng độ khó mượt theo thời gian theo phong cách Arcade nhẹ, đảm bảo:

Game không tăng tốc đột ngột

Người chơi có thời gian thích nghi

Có cảm giác progression

Reset sạch khi restart

Block 5 không thêm mechanic mới, chỉ nâng cấp game loop hiện có.

🧠 Tổng quan hệ thống

Block 5 gồm 5 module chính:

Difficulty Scaling (Enemy Speed)

Spawn Rate Scaling

Level System

Dynamic Background

Clean Reset Logic

1️⃣ Difficulty Scaling

Enemy tăng tốc theo điểm số.

const obstacleSpeed = BASE_OBSTACLE_SPEED + score * 0.002;
enemy.speed = Math.min(obstacleSpeed, MAX_OBSTACLE_SPEED);

Nguyên tắc:

Tăng tuyến tính

Có giới hạn tốc độ tối đa

Không dùng jump speed theo level

Scaling liên tục mỗi frame

Giá trị mặc định:
BASE_OBSTACLE_SPEED = 3.5
MAX_OBSTACLE_SPEED = 6

2️⃣ Spawn Rate Scaling

Spawn rate giảm dần theo điểm:

spawnRate = BASE_SPAWN_RATE - Math.floor(score / 100);
spawnRate = Math.max(spawnRate, MIN_SPAWN_RATE);

Nguyên tắc:

Giảm từ từ

Không spam quá mức

Có giới hạn tối thiểu

Giá trị mặc định:
BASE_SPAWN_RATE = 120
MIN_SPAWN_RATE = 60

3️⃣ Level System

Level dựa trên score:

function getLevelFromScore(score)

Mốc:
Level	Score
1	0 – 299
2	300 – 799
3	800 – 1499
4	1500+

Level chỉ dùng cho:

UI

Background color

Không tăng speed đột ngột

4️⃣ Dynamic Background

Background tối dần theo level:

getBackgroundByLevel(level)


Mục đích:

Tăng tension nhẹ

Không ảnh hưởng gameplay

5️⃣ Reset Logic (Quan trọng)

Reset đúng thứ tự:

score = 0;
level = 1;
enemy.speed = BASE_OBSTACLE_SPEED;
spawnRate = BASE_SPAWN_RATE;
frameCount = 0;
enemyEscapeTimer = 0;
gameState = PLAYING;


Sau đó:

Reset keys

Respawn player

Respawn enemy

Validate spawn

Đảm bảo:

Không carry state

Không bug speed stacking

🔁 Game Loop Flow (Sau Block 5)
INPUT
   ↓
movePlayer()
   ↓
moveEnemy()
   ↓
updateDifficulty()
   ↓
checkGameOver()
   ↓
clampPlayer()
   ↓
draw()

🎮 Kết quả sau Block 5

Game đạt trạng thái:

Playable

Có progression

Scaling mượt

Không gây ức chế

Reset sạch

Mức độ hoàn thiện:
Prototype hoàn chỉnh (Core Stable)

📌 Ghi chú kỹ thuật

Scaling dựa trên score (frame-based)

Không dùng deltaTime (Arcade đơn giản)

Không dùng exponential scaling

Không AI nâng cao

Block 5 tập trung vào nhịp độ game.

## 🛠 Tech Stack

- HTML5 Canvas
- Vanilla JavaScript
- No external libraries

---

## 🚀 How It Works

### Game Loop

The game runs using:

```js
requestAnimationFrame(gameLoop);
