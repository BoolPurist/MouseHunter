import { Shape, Point } from "./Shape.js";
import { Rectangle } from "./Rectangle.js";
import { Bullet } from "./Bullet.js";

("use strict");
// Player shape consists of 5 corner points used for drawing the shape.
// Width and Height determines size of the shape and the rectangle hitbox.
export function Player({
  context: context,
  centerPoint: centerPoint,
  width: _width,
  height: _height,
  colorStyle: colorStyle,
  velocity: velocity = 3,
  fireRate: fireRate = 0.5,
  bulletSpeed: bulletSpeed = 1,
  bulletColor: bulletColor = "black",
  bulletSize: bulletSize = 2,
} = {}) {
  Shape.call(this, arguments[0]);
  this._fireRate = 1;
  // Using Setter.
  this.fireRate = fireRate;
  this.velocity = velocity;
  this.bulletSpeed = bulletSpeed;
  this.bulletColor = bulletColor;
  this.bulletSize = bulletSize;
  this._width = _width;
  this._height = _height;
  this._hitbox = new Rectangle({
    context: this.context,
    centerPoint: this._centerPoint,
    colorStyle: this.colorStyle,
    width: _width,
    height: _height,
  });
  this._hitbox.opacity = 0.5;

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
  this._bullets = [];
  this._canFire = true;
}
// Inheritance.
Player.prototype = Object.create(Shape.prototype);

Object.defineProperty(Player.prototype, "constructor", {
  value: Player,
  enumerable: false,
  writable: true,
});

Object.defineProperty(Player.prototype, "fireRate", {
  get: function () {
    return this._fireRate / 1000;
  },
  set: function (value) {
    this._fireRate = Math.abs(value) * 1000;
  },
});

// Is applied to every rotation of this object so the object faces to
// the mouse pointer.
Player.prototype.offsetAngle = -0.5 * Math.PI;

Player.prototype.adjustAngleToPoint = function (point) {
  this.radians =
    Point.radiansBetween(this._centerPoint, point) + this.offsetAngle;
};

Player.prototype.handleSpawns = function () {
  this._bullets = this._bullets.filter((element) => element.turn());
};

Player.prototype.move = function (nextMove) {
  nextMove.x *= this.velocity;
  nextMove.y *= this.velocity;
  let movement = this._hitbox.collisionOutStopCanvas(nextMove);
  this._centerPoint.x += movement.x;
  this._centerPoint.y += movement.y;
  this._corners.forEach((cornerPoint) => {
    cornerPoint.x += movement.x;
    cornerPoint.y += movement.y;
  });

  this._hitbox.move(movement);
  this.handleSpawns();
};

// Spawns bullets when the fire button is pressed and cooldown
// for firing is up.
Player.prototype.fire = function () {
  if (this._canFire) {
    let bulletSpawnPoint = Point.polarToPoint(
      this._height / 2 + 5,
      this.radians + this.offsetAngle
    );
    bulletSpawnPoint.additionWith(this._centerPoint);
    this._bullets.push(
      new Bullet({
        context: this.context,
        centerPoint: bulletSpawnPoint,
        colorStyle: this.bulletColor,
        radius: this.bulletSize,
        shootAngle: this.radians + this.offsetAngle,
        velocity: this.bulletSpeed,
      })
    );

    this._canFire = false;
    console.log(this._fireRate);
    setTimeout(() => {
      this._canFire = true;
    }, this._fireRate);
  }
};
