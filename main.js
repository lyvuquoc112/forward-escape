const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // ngòi bút vẽ 2d

const squareSize = 40;
const x = (canvas.width - squareSize) / 2; // tính vị trí x
const y = (canvas.height - squareSize) / 2; // tính vị trí y

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#4cc9f0"; // màu hình vẽ
ctx.fillRect(x, y, squareSize, squareSize); // vị trí vẽ và kích thước của khối 
