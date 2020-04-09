// Setting for keybinding.
let Keys = {
  keyLeft: "a",
  keyRight: "d",
  keyUp: "w",
  keyDown: "s",
  keyFire: " ",
};
let physics = {
  // How fast the moves in a direction when a move key is held.
  playerAccelaration: 5,
};
// Storing if keys are held or not.
let keysPressed = new Map();
// Can get -1 so the x direction is left.
keysPressed.set("keyLeft", 0);
// Can get 1 so the x direction is right.
keysPressed.set("keyRight", 0);
// Can get -1 so the y direction is up.
keysPressed.set("keyUp", 0);
// Can get 1 so the y direction is down.
keysPressed.set("keyDown", 0);
// When true player can fire if cooldown is up for that of course.
keysPressed.set("keyFire", false);

export { Keys, keysPressed, physics };
