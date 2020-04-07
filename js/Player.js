import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
("use strict");
export function Player({
  context: context,
  centerPoint: centerPoint,
  width: _width,
  height: _height,
  colorStyle: colorStyle,
} = {}) {
  Shape.call(this, {
    context: context,
    centerPoint: centerPoint,
    colorStyle: colorStyle,
  });
  this._width = _width;
  this._height = _height;
  let yHalf = this._height * 0.5;
  let yHalfDown = this._centerPoint.y + yHalf;
  let xHalf = this._width * 0.5;
  this._corners[1] = new Point(
    this._centerPoint.x,
    this._centerPoint.y + this._height * 0.25
  );
  this._corners[3] = new Point(
    this._centerPoint.x,
    this._centerPoint.y - yHalf
  );
  this._corners[0] = new Point(this._centerPoint.x - xHalf, yHalfDown);
  this._corners[2] = new Point(this._centerPoint.x + xHalf, yHalfDown);
}

Player.prototype = Object.create(Shape.prototype);

Object.defineProperty(Player.prototype, "constructor", {
  value: Player,
  enumerable: false,
  writable: true,
});