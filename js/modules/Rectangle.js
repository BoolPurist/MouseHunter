import { Shape, Point } from "./Shape.js";
export function Rectangle({
  context: context,
  centerPoint: centerPoint,
  colorStyle: colorStyle,
  width: width = 0,
  height: height = 0,
  size: size = 0,
}) {
  Shape.call(this, arguments[0]);

  this._width = width + size;
  this._height = height + size;

  let halfWidth = this._width / 2;
  let halfHeight = this._height / 2;
  this._cornerLeftTop = new Point(
    this._centerPoint.x - halfWidth,
    this._centerPoint.y - halfHeight
  );
  this._cornerLeftBottom = new Point(
    this._centerPoint.x - halfWidth,
    this._centerPoint.y + halfHeight
  );
  this._cornerRightTop = new Point(
    this._centerPoint.x + halfWidth,
    this._centerPoint.y - halfHeight
  );
  this._cornerRightBottom = new Point(
    this._centerPoint.x + halfWidth,
    this._centerPoint.y + halfHeight
  );
}

Rectangle.prototype = Object.create(Shape.prototype);

Object.defineProperty(Rectangle.prototype, "constructor", {
  value: "Rectangle",
  enumerable: false,
  writable: true,
});

Rectangle.prototype.draw = function () {
  this.context.save();
  this._drawSetup();
  this.context.fillRect(
    this._cornerLeftTop.x,
    this._cornerLeftTop.y,
    this._width,
    this._height
  );
  this.context.restore();
};

// Checks for collision with assigned canvas
Rectangle.prototype.collidesWithOutCanvas = function (point) {
  return this.collidesWithOut.call(this, point, this.context.hitbox);
};

// Checks for collision with another hitbox.
Rectangle.prototype.collidesWithOut = function (toMove, otherHitbox) {
  return (
    this._cornerLeftTop.x + toMove.x < otherHitbox._cornerLeftTop.x ||
    this._cornerRightBottom.x + toMove.x > otherHitbox._cornerRightBottom.x ||
    this._cornerLeftTop.y + toMove.y < otherHitbox._cornerLeftTop.y ||
    this._cornerRightBottom.y + toMove.y > otherHitbox._cornerRightBottom.y
  );
};

// Checks for collision with assigned canvas keeps instance inside it.
Rectangle.prototype.collisionOutStopCanvas = function (point) {
  return this.collisionOutStop.call(this, point, this.context.hitbox);
};

// Checks for collision with another hitbox and keeps instance inside it.
Rectangle.prototype.collisionOutStop = function (point, otherHitbox) {
  let toMove = new Point(point.x, point.y);

  if (this._cornerLeftTop.x + toMove.x < otherHitbox._cornerLeftTop.x) {
    toMove.x = otherHitbox._cornerLeftTop.x - this._cornerLeftTop.x;
  }
  if (this._cornerRightBottom.x + toMove.x > otherHitbox._cornerRightBottom.x) {
    toMove.x = otherHitbox._cornerRightBottom.x - this._cornerRightBottom.x;
  }
  if (this._cornerLeftTop.y + toMove.y < otherHitbox._cornerLeftTop.y) {
    toMove.y = otherHitbox._cornerLeftTop.y - this._cornerLeftTop.y;
  }
  if (this._cornerRightBottom.y + toMove.y > otherHitbox._cornerRightBottom.y) {
    toMove.y = otherHitbox._cornerRightBottom.y - this._cornerRightBottom.y;
  }

  return toMove;
};

Rectangle.prototype.collidesWithIn = function (point, otherHitbox) {
  // return this.containsPoint(Point.Addition(otherHitbox._cornerLeftTop, point));
  return (
    this.containsPoint(Point.Addition(otherHitbox._cornerLeftTop, point)) ||
    this.containsPoint(Point.Addition(otherHitbox._cornerLeftBottom, point)) ||
    this.containsPoint(Point.Addition(otherHitbox._cornerRightTop, point)) ||
    this.containsPoint(Point.Addition(otherHitbox._cornerRightBottom, point))
  );
};

Rectangle.prototype.containsPoint = function (point) {
  return (
    this._cornerLeftTop.x <= point.x &&
    this._cornerLeftTop.y <= point.y &&
    this._cornerRightBottom.x >= point.x &&
    this._cornerRightBottom.y >= point.y
  );
};

Rectangle.prototype.move = function (point) {
  this._cornerLeftTop.x += point.x;
  this._cornerLeftTop.y += point.y;
  this._cornerRightBottom.x += point.x;
  this._cornerRightBottom.y += point.y;
};
