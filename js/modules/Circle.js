import { Shape } from "./Shape.js";
import { Rectangle } from "./Rectangle.js";

export function Circle({
  context: context,
  centerPoint: centerPoint,
  colorStyle: colorStyle,
  radius: radius = 2,
  velocity: velocity,
}) {
  Shape.call(this, arguments[0]);

  this.radius = radius;
  this.hitbox = new Rectangle({
    context: context,
    centerPoint: centerPoint,
    colorStyle: colorStyle,
    size: radius * 2,
  });
  this.hitbox.opacity = 0.5;
  this.velocity = velocity;
}

Circle.prototype = Object.create(Shape.prototype);

Object.defineProperty(Circle.prototype, "constructor", {
  value: Circle,
  enumerable: false,
  writable: true,
});

// Needed for drawing a complete circle to be drawn.
// This way the multiplication does not need to be done over and over.
Circle.prototype._fullPi = 2 * Math.PI;

// Draws a circle with the center point of the instance and the radius as length.
Circle.prototype.draw = function () {
  this.context.save();
  this._drawSetup();
  this.context.beginPath();
  this.context.arc(
    this._centerPoint.x,
    this._centerPoint.y,
    this.radius,
    0,
    this._fullPi,
    true
  );
  this.context.fill();
  this.context.restore();
};

Circle.prototype.move = function (nextMove) {
  nextMove.x *= this.velocity;
  nextMove.y *= this.velocity;
  let movement = this.hitbox.collisionOutStopCanvas(nextMove);
  this._centerPoint.x += movement.x;
  this._centerPoint.y += movement.y;
  this.hitbox.move(movement);
};
