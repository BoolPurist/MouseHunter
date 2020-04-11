import { Point } from "./Point.js";
export { Point };
// For inheritance.
export function Shape({
  context: context = null,
  centerPoint: centerPoint = null,
  colorStyle: colorStyle = "white",
} = {}) {
  this.context = context;
  this.colorStyle = colorStyle;
  this._radians = 0;
  this.opacity = 1;
  this._centerPoint = centerPoint;
  this._corners = [];
}

Object.defineProperty(Shape.prototype, "radians", {
  get: function () {
    return this._radians;
  },
  set: function (value) {
    this._radians = value % (2 * Math.PI);
  },
});

// For easy converting in from degree into radians and back.
// For rotation operation in the canvas, radians are used as angle.
Object.defineProperty(Shape.prototype, "degrees", {
  get: function () {
    return this._radians / (Math.PI / 180);
  },
  set: function (value) {
    value %= 360;
    this._radians = (Math.PI / 180) * value;
  },
});

Shape.prototype.adjustAngleToPoint = function (point) {
  this.radians = Point.radiansBetween(this._centerPoint, point) - 0.5 * Math.PI;
};

// Draws lines according to the order of the points in the corner list.
Shape.prototype.draw = function () {
  this.context.save();
  this._drawSetup();
  this.context.beginPath();
  this.context.moveTo(this._corners[0].x, this._corners[0].y);
  for (let index = 1; index < this._corners.length; index++) {
    this.context.lineTo(this._corners[index].x, this._corners[index].y);
  }
  this.context.fill();

  this.context.restore();
};

Shape.prototype._drawSetup = function () {
  if (this.radians !== 0) {
    this.context.translate(this._centerPoint.x, this._centerPoint.y);
    this.context.rotate(this.radians);
    this.context.translate(-this._centerPoint.x, -this._centerPoint.y);
  }
  this.context.globalAlpha = this.opacity;
  this.context.fillStyle = this.colorStyle;
};

// Draws all coordinates as text of every corner point of a shape
// on the canvas of the shape.
Shape.prototype.drawCornersCoordinates = function () {
  this._corners.forEach((element, index) => {
    element.drawText({
      context: this.context,
      colorStyle: colorStyle,
      offset: 0,
      lable: `${index}: `,
      radians: this.radians,
      rotationPoint: this._centerPoint,
    });
  });
};
