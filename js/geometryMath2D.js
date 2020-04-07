export const geometryMath2D = {
  degreeToRadian: function (degree) {
    return (Math.PI / 180) * degree;
  },
  fillSquare: function (context, point, length) {
    context.fillRect(point.x, point.y, point.x + length, point.y + length);
  },
};
