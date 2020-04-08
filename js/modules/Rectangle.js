import { Shape, Point } from "./Shape.js";
export function Rectangle({
  context: context,
  centerPoint: centerPoint,
  colorStyle: colorStyle,
  width: width = 0,
  height: height = 0,
  size: size = 0,
}) {
  Shape.call(this, {
    context: context,
    centerPoint: centerPoint,
    colorStyle: colorStyle,
  });

  this._width = width + size;
  this._height = height + size;

  this._cornerLeftTop = new Point(
    this._centerPoint.x - this._width / 2,
    this._centerPoint.y - this._height / 2
  );
  this._cornerRightBottom = new Point(
    this._centerPoint.x + this._width / 2,
    this._centerPoint.y + this._height / 2
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

Rectangle.prototype.collisionOutStopCanvas = function (point) {
  return this.collisionOutStop.call(this, point, this.context.hitbox);
};

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

Rectangle.prototype.move = function (point) {
  this._cornerLeftTop.x += point.x;
  this._cornerLeftTop.y += point.y;
  this._cornerRightBottom.x += point.x;
  this._cornerRightBottom.y += point.y;
};
