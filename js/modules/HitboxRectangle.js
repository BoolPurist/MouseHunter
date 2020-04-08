import { Rectangle } from "./Rectangle.js";
import { Point } from "./Point.js";
export function HitboxRectangle({
  context: context,
  centerPoint: centerPoint,
  colorStyle: colorStyle,
  width: width,
  height: height,
  size: size,
}) {
  Rectangle.call(this, {
    context: context,
    centerPoint: centerPoint,
    colorStyle: colorStyle,
    width: width,
    height: height,
    size: size,
  });
}

HitboxRectangle.prototype = Object.create(Rectangle.prototype);

HitboxRectangle.prototype = Object.defineProperty(
  HitboxRectangle.prototype,
  "constructor",
  {
    value: HitboxRectangle,
    enumerable: false,
    writable: true,
  }
);

HitboxRectangle.prototype.keepInCanvas = function (point) {
  let toMove = new Point(point.x, point.y);
  if (this._cornerLeftTop.x + toMove.x < 0) {
    toMove.x = this._cornerLeftTop.x;
  }
  if (this._cornerRightBottom.x + toMove.x > this.context.canvas.width) {
    toMove.x = this.context.canvas.width - this._cornerRightBottom.x;
  }
  if (this._cornerLeftTop.y + toMove.y < 0) {
    toMove.y = this._cornerLeftTop.y;
  }
  if (this._cornerRightBottom.y + toMove.y > this.context.canvas.height) {
    toMove.y = this.context.canvas.height - this._cornerRightBottom.y;
  }

  return toMove;
};

HitboxRectangle.prototype.update = function (point) {
  this._cornerLeftTop.x += point.x;
  this._cornerLeftTop.y += point.y;
  this._cornerRightBottom.x += point.x;
  this._cornerRightBottom.y += point.y;
};
