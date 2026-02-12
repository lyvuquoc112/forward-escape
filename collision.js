//AABB – Axis Aligned Bounding Box
// left = x
// right = x + width
// top = y
// bottom = y + height
// xác nhận bắt đầu va chạm
export function isColliding(a, b) {
  return (
    a.x < b.x + b.width && // vị trí của người và vị trí + rộng của vật
    a.x + a.width > b.x && // vị trí của người + rộng của người và vị trí của vật
    a.y < b.y + b.height && // vị trí của người và vị trí + cao của vật
    a.y + a.height > b.y // vị trí của người + cao của người và vị trí của vật
  );
}

export function isCollidingWithWalls(entity, walls) {
  return walls.some((wall) => isColliding(entity, wall));
}
