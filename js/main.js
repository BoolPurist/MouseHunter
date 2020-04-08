import { Setting } from "./Setting.js";
import { Point } from "./modules/Point.js";
import { Player } from "./modules/Player.js";
import { Rectangle } from "./modules/Rectangle.js";

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

    gameLoop();
    function gameLoop() {
      // console.log(currentKeyMove);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      keysPressed.clear();
      player.draw();
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
