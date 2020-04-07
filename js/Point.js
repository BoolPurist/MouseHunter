// As component of other objects too.
export function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
Point.prototype.coordString = function () {
  return `(${Math.round(this.x, 2)}, ${Math.round(this.y, 2)})`;
};
Point.prototype.drawText = function ({
  context,
  colorStyle: colorStyle = "black",
  offsetX: offsetX = 0,
  offsetY: offsetY = 0,
  offset: offset = 0,
  radians: radians = 0,
  rotationPoint: rotationPoint = new Point(),
} = {}) {
  context.save();
  context.fillStyle = colorStyle;
  if (radians !== 0) {
    context.translate(rotationPoint.x, rotationPoint.y);
    context.rotate(radians);
    context.translate(-rotationPoint.x, -rotationPoint.y);
  }
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
