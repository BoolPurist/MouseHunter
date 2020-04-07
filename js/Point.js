// As component of other objects too.
export function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
Point.prototype.coordString = function () {
  return `(${this.x}, ${this.y})`;
};
Point.prototype.drawText = function ({
  context,
  colorStyle: colorStyle = "black",
  offsetX = 0,
  offsetY = 0,
  offset = 0,
} = {}) {
  context.save();
  context.fillStyle = colorStyle;
  context.fillText(
    this.coordString(),
    this.x + offsetX + offset,
    this.y + offsetY + offset
  );
  context.restore();
};

Point.distancePoints = function (point1, point2) {
  let dx = point1.x - point2.y;
  let dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Point.drawLine = function (context, point1, point2) {
  context.beginPath();
  context.moveTo(point1.x, point2.y);
  context.lineTo(point2.x, point2.y);
  context.stroke();
};
