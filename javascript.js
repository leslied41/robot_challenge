const robotEl = document.getElementById("robot");
const robotImage = document.getElementById("robotImg");
const form = document.getElementById("form");
const xEl = document.getElementById("x");
const yEl = document.getElementById("y");
const fEl = document.getElementById("f");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const moveBtn = document.getElementById("move");
const reportBtn = document.getElementById("report");

let x = 0;
let y = 0;

window.addEventListener("load", () => {
  robotEl.style.left = 0;
  robotEl.style.bottom = 0;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const xValue = xEl.value;
  const yValue = yEl.value;
  const fValue = fEl.value;
  if (xValue && yValue && fValue) {
    x = xValue;
    y = yValue;
    robotEl.style.left = `${xValue}px`;
    robotEl.style.bottom = `${yValue}px`;
    switch (fValue.toUpperCase()) {
      case "NORTH":
        robotImage.classList.value = "robot_spritesheet pixelart face-back";
        break;
      case "EAST":
        robotImage.classList.value = "robot_spritesheet pixelart face-right";
        break;
      case "SOUTH":
        robotImage.classList.value = "robot_spritesheet pixelart";
        break;
      case "WEST":
        robotImage.classList.value = "robot_spritesheet pixelart face-left";
        break;

      default:
        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    robotImage.classList.value = "robot_spritesheet pixelart face-left";
  }
  if (e.key === "ArrowRight") {
    robotImage.classList.value = "robot_spritesheet pixelart face-right";
  }
  if (e.key === "ArrowUp") {
    robotImage.classList.value = "robot_spritesheet pixelart face-back";
  }
  if (e.key === "ArrowDown") {
    robotImage.classList.value = "robot_spritesheet pixelart ";
  }
});

rightBtn.addEventListener("click", () => {
  if (robotImage.classList.contains("face-back")) {
    robotImage.classList.value = "robot_spritesheet pixelart face-right";
  } else if (robotImage.classList.contains("face-left")) {
    robotImage.classList.value = "robot_spritesheet pixelart face-back";
  } else if (robotImage.classList.contains("face-right")) {
    robotImage.classList.value = "robot_spritesheet pixelart";
  } else {
    robotImage.classList.value = "robot_spritesheet pixelart face-left";
  }
});

leftBtn.addEventListener("click", () => {
  if (robotImage.classList.contains("face-back")) {
    robotImage.classList.value = "robot_spritesheet pixelart face-left";
  } else if (robotImage.classList.contains("face-left")) {
    robotImage.classList.value = "robot_spritesheet pixelart ";
  } else if (robotImage.classList.contains("face-right")) {
    robotImage.classList.value = "robot_spritesheet pixelart face-back";
  } else {
    robotImage.classList.value = "robot_spritesheet pixelart face-right";
  }
});

moveBtn.addEventListener("click", () => {
  if (robotImage.classList.contains("face-back")) {
    if (y >= 0 && y <= 300) {
      y = y + 100;
      robotEl.style.bottom = `${y}px`;
    }
  } else if (robotImage.classList.contains("face-left")) {
    if (x > 0 && x <= 400) {
      x = x - 100;
      robotEl.style.left = `${x}px`;
    }
  } else if (robotImage.classList.contains("face-right")) {
    if (x >= 0 && x <= 300) {
      x = x + 100;
      robotEl.style.left = `${x}px`;
    }
  } else {
    if (y > 0 && y <= 400) {
      y = y - 100;
      robotEl.style.bottom = `${y}px`;
    }
  }
});

reportBtn.addEventListener("click", () => {
  let facing_direction;
  if (robotImage.classList.contains("face-back")) {
    facing_direction = "NORTH";
  } else if (robotImage.classList.contains("face-left")) {
    facing_direction = "WEST";
  } else if (robotImage.classList.contains("face-right")) {
    facing_direction = "EAST";
  } else {
    facing_direction = "SOUTH";
  }
  alert(`X: ${x}. Y: ${y}. Facing direction: ${facing_direction}.`);
});
