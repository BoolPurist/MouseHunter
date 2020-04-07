import { Point } from "./Point.js";
import { Player } from "./Player.js";
import { geometryMath2D } from "./geometryMath2D.js";
// import * as GeometryMath2D from "./geometryMath2D.js";
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const canvas = document.querySelector("#canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let player = new Player({
      context: ctx,
      colorStyle: "black",
      centerPoint: new Point(50, 50),
      width: 50,
      height: 50,
    });
    let degree = 220;
    player.degrees = -100;
    player.draw();
    player.drawCornersCoordinates("red");
  } else {
    // coder for browsers which do not support the canvas api.
  }
});
