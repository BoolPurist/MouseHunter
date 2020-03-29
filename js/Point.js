export function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
Point.prototype.coordString = function() {
  return `(${this.x}, ${this.y})`;
};
Point.prototype.drawText = function({
  canvas,
  offsetX = 0,
  offsetY = 0,
  offset = 0
} = {}) {
  canvas.fillText(
    this.coordString(),
    this.x + offsetX + offset,
    this.y + offsetY + offset
  );
};

Point.distancePoints = function(point1, point2) {
  let dx = point1.x - point2.y;
  let dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Point.drawLine = function(canvas, point1, point2) {
  canvas.beginPath();
  canvas.moveTo(point1.x, point2.y);
  canvas.lineTo(point2.x, point2.y);
  canvas.stroke();
};
