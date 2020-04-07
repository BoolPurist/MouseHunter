// Represents a point in 2d coordinate system.
// As component of other objects too.
export function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

// Provides coordinates in text format.
Point.prototype.coordinatesString = function () {
  return `(${Math.round(this.x, 2)}, ${Math.round(this.y, 2)})`;
};

// Draws the coordinates in text format on canvas.
Point.prototype.drawText = function ({
  context,
  colorStyle: colorStyle = "black",
  offsetX: offsetX = 0,
  offsetY: offsetY = 0,
  offset: offset = 0,
  lable: lable = "",
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
    lable + this.coordinatesString(),
    this.x + offsetX + offset,
    this.y + offsetY + offset
  );
  context.restore();
};

// Returns the Length of the line between the two points as param 1 & 2.
Point.distancePoints = function (point1, point2) {
  let dx = point1.x - point2.y;
  let dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Draws a line between 2 points on a canvas.
Point.drawLine = function (context, point1, point2) {
  context.beginPath();
  context.moveTo(point1.x, point2.y);
  context.lineTo(point2.x, point2.y);
  context.stroke();
};
