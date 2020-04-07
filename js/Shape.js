import { Point } from "./Point.js";
export { Point };
// For inheritance.
export function Shape({
  context: context = null,
  centerPoint: centerPoint = null,
  colorStyle: colorStyle = "white",
} = {}) {
  this.context = context;
  this._centerPoint = centerPoint;
  this._corners = [];
  this.radians = 0;
  this.colorStyle = colorStyle;
}

// For easy converting in from degree into radians and back.
// For rotation operation in the canvas, radians are used as angle.
Shape.prototype = {
  get degrees() {
    return this.radians / (Math.PI / 180);
  },
  set degrees(value) {
    this.radians = (Math.PI / 180) * value;
  },
};

// Draws lines according to the order of the points in the corner list.
Shape.prototype.draw = function () {
  this.context.save();
  if (this.radians !== 0) {
    this.context.translate(this._centerPoint.x, this._centerPoint.y);
    this.context.rotate(this.radians);
    this.context.translate(-this._centerPoint.x, -this._centerPoint.y);
  }
  this.context.fillStyle = this.colorStyle;
  this.context.beginPath();
  this.context.moveTo(this._corners[0].x, this._corners[0].y);
  for (let index = 1; index < this._corners.length; index++) {
    this.context.lineTo(this._corners[index].x, this._corners[index].y);
  }
  this.context.fill();

  this.context.restore();
};

// Draws all coordinates as text of every corner point of a shape
// on the canvas of the shape.
Shape.prototype.drawCornersCoordinates = function (colorStyle = "black") {
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

Shape.prototype.move = function (x = 0, y = 0) {};
