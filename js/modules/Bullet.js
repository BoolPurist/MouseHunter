import { Circle } from "./Circle.js";
import { Point } from "./Point.js";
export function Bullet({
  context: context,
  centerPoint: centerPoint,
  colorStyle: colorStyle,
  radius: radius,
  shootAngle: shootAngle,
  velocity: velocity,
}) {
  Circle.call(this, arguments[0]);
  this._movement = new Point(
    Math.cos(shootAngle) * velocity,
    Math.sin(shootAngle) * velocity
  );
}

Bullet.prototype = Object.create(Circle.prototype);

Object.defineProperty(Bullet.prototype, "constructor", {
  value: Bullet,
  enumerable: false,
  writable: true,
});

// Actions done on its own as long as it destroys itself.
// It destories itself when colliding with certain objects.
Bullet.prototype.turn = function () {
  if (this.hitbox.collidesWithOutCanvas(this._movement)) {
    console.log("Out");
    return false;
  } else {
    this.move(this._movement);
    this.draw();
    return true;
  }
};
