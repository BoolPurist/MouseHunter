let Setting = {
  player: {
    // How fast the moves in a direction when a move key is held.
    velocity: 5,
    fireRate: 0.1,
    bulletSpeed: 1.1,
    bulletColor: "black",
    bulletSize: 4,
  },
  // Setting for keybinding.
  keys: {
    keyLeft: "a",
    keyRight: "d",
    keyUp: "w",
    keyDown: "s",
    keyFire: " ",
  },
  // Storing if keys are held or not.
  keysPressed: (function () {
    let keyPressed = new Map();
    // Can get -1 so the x direction is left.
    keyPressed.set("keyLeft", 0);
    // Can get 1 so the x direction is right.
    keyPressed.set("keyRight", 0);
    // Can get -1 so the y direction is up.
    keyPressed.set("keyUp", 0);
    // Can get 1 so the y direction is down.
    keyPressed.set("keyDown", 0);
    // When true player can fire if cooldown is up for that of course.
    keyPressed.set("keyFire", false);

    return keyPressed;
  })(),
};

export { Setting };
