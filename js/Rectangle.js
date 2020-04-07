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
}

Rectangle.prototype = Object.create(Shape.prototype);

Object.defineProperty(Rectangle.prototype, "constructor", {
  value: "Rectangle",
  enumerable: false,
  writable: true,
});

Rectangle.prototype.draw = function () {
  this.context.save();
  if (this.radians !== 0) {
    this.context.translate(this._centerPoint.x, this._centerPoint.y);
    this.context.rotate(this.radians);
    this.context.translate(-this._centerPoint.x, -this._centerPoint.y);
  }
  this.context.fillStyle = this.colorStyle;
  this.context.fillRect(
    this._cornerLeftTop.x,
    this._cornerLeftTop.y,
    this._width,
    this._height
  );
  this.context.restore();
};
