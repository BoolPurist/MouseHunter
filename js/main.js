import { Point } from "./Point.js";
// import * as GeometryMath2D from "./geometryMath2D.js";
document.addEventListener("DOMContentLoaded", function() {
  "use strict";
  const canvas = document.querySelector("#canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "green";
    ctx.fillStyle = "white";
    let point = new Point(80, 125);
    let point2 = new Point(150, 150);
    console.log(Point.distancePoints(point, point2));
    point2.drawText({ ctx: ctx, offset: 15 });
    Point.drawLine(ctx, point, point2);

    // @param color: string -> "rgb(x,x,x)" for example "rgb(255,255,255)" | color keywords like red, blue, green etc ..
    // @param coord: array -> 4 elements as integers.
    function drawRect(color, coord) {
      ctx.fillStyle = color;
      ctx.fillRect(coord[0], coord[1], coord[2], coord[3]);
    }
    // @param color: string -> "rgb(x,x,x)" for example "rgb(255,255,255)" | color keywords like red, blue, green etc ..
    // @param coord: array -> 3 elements as integers.
    function drawSquare(color, coord) {
      ctx.fillStyle = color;
      ctx.fillRect(
        coord[0],
        coord[1],
        coord[0] + coord[2],
        coord[1] + coord[2]
      );
    }
  } else {
    // coder for browser you do not support the canvas api.
  }
});
