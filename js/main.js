import { Point } from "./Point.js";
import { Player } from "./Player.js";
import { geometryMath2D } from "./geometryMath2D.js";
// import * as GeometryMath2D from "./geometryMath2D.js";
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const canvas = document.querySelector("#canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let player = new Player(new Point(50, 50), 50, 50, "red");
    player.draw(ctx);
  } else {
    // coder for browsers which do not support the canvas api.
  }
});
