import { Setting } from "./Setting.js";
import { Point } from "./modules/Point.js";
import { Player } from "./modules/Player.js";
import { Rectangle } from "./modules/Rectangle.js";

// import * as GeometryMath2D from "./geometryMath2D.js";
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("keydown", keyListener, false);
  let keysPressed = new Map();
  ("use strict");
  let canvas = document.querySelector("#canvas");

  if (canvas.getContext) {
    // Setup.
    let ctx = canvas.getContext("2d");
    let canvasHalfWidth = ctx.canvas.width / 2;
    let canvasHalfHeight = ctx.canvas.height / 2;
    ctx.hitbox = new Rectangle({
      context: ctx,
      centerPoint: new Point(canvasHalfWidth, canvasHalfHeight),
      width: ctx.canvas.width,
      height: ctx.canvas.height,
    });

    let player = new Player({
      context: ctx,
      colorStyle: "Red",
      centerPoint: new Point(150, 150),
      width: 50,
      height: 50,
      accelaration: Setting.playerAccelaration,
    });

    gameLoop();
    function gameLoop() {
      // Setup of frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Start of Frame
      let moveX = keysPressed.has("moveX") ? keysPressed.get("moveX") : 0;
      let moveY = keysPressed.has("moveY") ? keysPressed.get("moveY") : 0;
      player.move(new Point(moveX, moveY));
      player.draw();
      // End of frame
      keysPressed.clear();
      requestAnimationFrame(gameLoop);
    }
  } else {
    // coder for browsers which do not support the canvas api.
  }

  function keyListener(event) {
    let keyPresssed = event.key;
    if (keyPresssed === Setting.keyLeft) {
      keysPressed.set("moveX", -1);
    }
    if (keyPresssed === Setting.keyRight) {
      keysPressed.set("moveX", 1);
    }
    if (keyPresssed === Setting.keyUp) {
      keysPressed.set("moveY", -1);
    }
    if (keyPresssed === Setting.keyDown) {
      keysPressed.set("moveY", 1);
    }
  }

  function processPlayerInput(player, keysPressed) {}
});
