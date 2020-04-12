import { Point } from "./Point.js";
export { Point };
// For inheritance.
export function Shape({
  context: context = null,
  centerPoint: centerPoint = null,
  colorStyle: colorStyle = "black",
} = {}) {
  if (context === null) {
    errorMsg("context");
  } else if (context.constructor.name !== "CanvasRenderingContext2D") {
    console.error('Parameter is not of type "CanvasRenderingContext2D".');
    console.trace();
  } else if (centerPoint === null) {
    errorMsg("centerPoint");
  }
  this.context = context;
  this.colorStyle = colorStyle;
  this.opacity = 1;
  this._radians = 0;
  this._centerPoint = centerPoint;
  this._corners = [];

  function errorMsg(parameter) {
    console.log(`Mandatory parameter "${parameter}" was not provided.`);
    console.trace();
  }
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
Shape.prototype.drawCornersCoordinates = function (
  colorStyle = this.colorStyle
) {
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
