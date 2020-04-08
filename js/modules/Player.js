import { Shape, Point } from "./Shape.js";
import { Rectangle } from "./Rectangle.js";

("use strict");
// Player shape consists of 5 corner points used for drawing the shape.
// Width and Height determines size of the shape and the rectangle hitbox.
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
  // position of the corners points depend on the centerPoint.
  let yHalf = this._height * 0.5;
  let yHalfDown = this._centerPoint.y + yHalf;
  let xHalf = this._width * 0.5;
  this._corners[0] = new Point(this._centerPoint.x - xHalf, yHalfDown);
  this._corners[1] = new Point(
    this._centerPoint.x,
    this._centerPoint.y + this._height * 0.25
  );
  this._corners[2] = new Point(this._centerPoint.x + xHalf, yHalfDown);
  this._corners[3] = new Point(
    this._centerPoint.x,
    this._centerPoint.y - yHalf
  );

  this.hitbox = new Rectangle({
    context: this.context,
    centerPoint: this._centerPoint,
    colorStyle: this.colorStyle,
    width: _width,
    height: _height,
  });
}
// Inheritance.
Player.prototype = Object.create(Shape.prototype);

Object.defineProperty(Player.prototype, "constructor", {
  value: Player,
  enumerable: false,
  writable: true,
});

Player.prototype.move = function (x = 0, y = 0) {
  let movement = this.hitbox.collisionOutStopCanvas(new Point(x, y));
  this._centerPoint.x += movement.x;
  this._centerPoint.y += movement.y;
  this._corners.forEach((cornerPoint) => {
    cornerPoint.x += movement.x;
    cornerPoint.y += movement.y;
  });
  this.hitbox.move(movement);
  this.draw();
};
