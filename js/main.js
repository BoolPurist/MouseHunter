import { Setting } from "./Setting.js";
import { Point } from "./Point.js";
import { Player } from "./Player.js";
import { Rectangle } from "./Rectangle.js";

// import * as GeometryMath2D from "./geometryMath2D.js";
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("keypress", keyListener, false);
  let keysPressed = new Map();
  ("use strict");
  let canvas = document.querySelector("#canvas");

  if (canvas.getContext) {
    // Setup.
    let ctx = canvas.getContext("2d");

    let player = new Player({
      context: ctx,
      colorStyle: "Red",
      centerPoint: new Point(50, 50),
      width: 50,
      height: 50,
    });
    let player2 = new Player({
      context: ctx,
      colorStyle: "blue",
      centerPoint: new Point(200, 200),
      width: 50,
      height: 50,
    });

    let rect = new Rectangle({
      context: ctx,
      centerPoint: new Point(100, 100),
      colorStyle: "Green",
      size: 50,
    });
    gameLoop();
    function gameLoop() {
      // console.log(currentKeyMove);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      keysPressed.clear();
      rect.degrees++;
      rect.degrees %= 360;
      rect.draw();

      player2.draw();

      requestAnimationFrame(gameLoop);
    }
  } else {
    // coder for browsers which do not support the canvas api.
  }

  function keyListener(event) {
    let keyPresssed = event.key;
    if (
      keyPresssed === Setting.keyLeft ||
      keyPresssed === Setting.keyRight ||
      keyPresssed === Setting.keyDown ||
      keyPresssed === Setting.keyUp
    ) {
      keysPressed.set("keyMove", keyPresssed);
    }
  }

  function processPlayerInput(player, keysPressed) {}
});
