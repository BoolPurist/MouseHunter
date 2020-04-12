import { Setting } from "./Setting.js";
import { Point } from "./modules/Point.js";
import { Player } from "./modules/Player.js";
import { Rectangle } from "./modules/Rectangle.js";
import { Circle } from "./modules/Circle.js";

document.addEventListener("DOMContentLoaded", function () {
  // Listening for the player input.
  document.body.addEventListener("keydown", keyListenerDown, false);
  document.body.addEventListener("keyup", keyListenerUp, false);
  let keysPressed = Setting.keysPressed;
  ("use strict");
  let canvas = document.querySelector("#canvas");
  let mousePosition = {
    X: 0,
    Y: 0,
  };
  canvas.addEventListener("mousemove", mousePositionListener, false);
  // Setting up the canvas with its hitbox.
  if (canvas.getContext) {
    // Setup.
    let ctx = canvas.getContext("2d");
    let canvasHalfWidth = ctx.canvas.width / 2;
    let canvasHalfHeight = ctx.canvas.height / 2;
    // Something is outside the canvas when it is outside its hitbox.
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
      velocity: Setting.player.velocity,
      fireRate: Setting.player.fireRate,
      bulletSpeed: Setting.player.bulletSpeed,
      bulletColor: Setting.player.bulletColor,
      bulletSize: Setting.player.bulletSize,
    });

    let customEvent = new CustomEvent("test");
    gameLoop();
    function gameLoop() {
      // Setup of frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Start of Frame
      let moveX = keysPressed.get("keyLeft") + keysPressed.get("keyRight");
      let moveY = keysPressed.get("keyUp") + keysPressed.get("keyDown");
      player.adjustAngleToPoint(new Point(mousePosition.X, mousePosition.Y));
      if (keysPressed.get("keyFire")) {
        player.fire();
      }
      player.move(new Point(moveX, moveY));
      player.draw();
      // End of frame
      requestAnimationFrame(gameLoop);
    }
  } else {
    // coder for browsers which do not support the canvas api.
  }

  // Listening to all keys hold down by player.
  function keyListenerDown(event) {
    let keyPressed = event.key.toLowerCase();
    switch (keyPressed) {
      case Setting.keys.keyLeft:
        keysPressed.set("keyLeft", -1);
        break;
      case Setting.keys.keyRight:
        keysPressed.set("keyRight", 1);
        break;
      case Setting.keys.keyUp:
        keysPressed.set("keyUp", -1);
        break;
      case Setting.keys.keyDown:
        keysPressed.set("keyDown", 1);
        break;
      case Setting.keys.keyFire:
        keysPressed.set("keyFire", true);
        break;
      default:
        break;
    }
  }

  // Listening to all keys released by player.
  function keyListenerUp(event) {
    let keyPressed = event.key.toLowerCase();
    switch (keyPressed) {
      case Setting.keys.keyLeft:
        keysPressed.set("keyLeft", 0);
        break;
      case Setting.keys.keyRight:
        keysPressed.set("keyRight", 0);
        break;
      case Setting.keys.keyUp:
        keysPressed.set("keyUp", 0);
        break;
      case Setting.keys.keyDown:
        keysPressed.set("keyDown", 0);
        break;
      case Setting.keys.keyFire:
        keysPressed.set("keyFire", false);
        break;
      default:
        break;
    }
  }

  function mousePositionListener(event) {
    mousePosition.X = event.clientX;
    mousePosition.Y = event.clientY;
  }
});
