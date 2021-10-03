const form = document.getElementById("form");
const xEl = document.getElementById("x");
const yEl = document.getElementById("y");
const fEl = document.getElementById("f");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const moveBtn = document.getElementById("move");
const reportBtn = document.getElementById("report");
const robotImgCollection = document.getElementsByTagName("img");
const gridEl = document.getElementById("grid");

let robotList = [];
let x = 0;
let y = 0;

// newRobotBtn.addEventListener("click", () => {
//   const robotId = new Date().getTime().toString();

//   robotList.push(robotId);
//   console.log(robotList);

//   robotsEl.innerHTML = `
//         ${robotList.map(
//           (id) => `<div class='robots' id=${id}><img
//             class="robot_spritesheet pixelart"
//             id='${id}'
//             src="./robot.png"
//             alt="robot"
//           /></div>`
//         )}

//   `;

//   containerEl.replaceChild(robotsEl, robotsEl);

//   // robotsEl.insertAdjacentHTML(
//   //   "afterbegin",
//   //   `
//   //       ${robotList.map(
//   //         (id) => `<div class='robots' id=${id}><img
//   //           class="robot_spritesheet pixelart"
//   //           id='${id}'
//   //           src="./robot.png"
//   //           alt="robot"
//   //         /></div>`
//   //       )}

//   // `
//   // );
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const robotEl = document.createElement("div");

  robotEl.innerHTML = ` <img
            class="robot_spritesheet pixelart"
            id="robotImg"
            src="./robot.png"
            alt="robot"
          />`;
  robotEl.classList.add("robot");
  robotEl.setAttribute("id", "robot");
  gridEl.appendChild(robotEl);
  const robotImage = document.getElementById("robotImg");
  const xValue = xEl.value;
  const yValue = yEl.value;
  const fValue = fEl.value;
  if (xValue && yValue && fValue) {
    x = parseInt(xValue);
    y = parseInt(yValue);
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
  //turn right
  const turnRight = () => {
    if (robotImage.classList.contains("face-back")) {
      robotImage.classList.value = "robot_spritesheet pixelart face-right";
    } else if (robotImage.classList.contains("face-left")) {
      robotImage.classList.value = "robot_spritesheet pixelart face-back";
    } else if (robotImage.classList.contains("face-right")) {
      robotImage.classList.value = "robot_spritesheet pixelart";
    } else {
      robotImage.classList.value = "robot_spritesheet pixelart face-left";
    }
  };
  rightBtn.addEventListener("click", turnRight);

  //turn left
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
  //move
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
  //report
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
    alert(
      `X: ${x / 100}. Y: ${y / 100}. Facing direction: ${facing_direction}.`
    );
  });
});
