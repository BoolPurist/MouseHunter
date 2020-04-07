// For inheritance.
export function Shape({
  context: context = null,
  centerPoint: centerPoint,
  colorStyle: colorStyle = "white",
} = {}) {
  this.context = context;
  this._centerPoint = centerPoint;
  this._corners = [];
  this.colorStyle = colorStyle;
}

Shape.prototype.draw = function (angle = 0) {
  this.context.save();
  if (angle !== 0) {
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

Shape.prototype.drawCornersCoordinates = function (colorStyle = "black") {
  this._corners.forEach((element) => {
    element.drawText({
      context: this.context,
      colorStyle: colorStyle,
      offset: 0,
    });
  });
};
