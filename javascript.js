const form = document.getElementById("form");
//const activeForm = document.getElementById("activeForm");
const xEl = document.getElementById("x");
const yEl = document.getElementById("y");
const fEl = document.getElementById("f");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const moveBtn = document.getElementById("move");
const reportBtn = document.getElementById("report");
const gridEl = document.getElementById("grid");

let robotList = [];
let x = 0;
let y = 0;
let targetRobotImg;
let targetRobotEl;

let number = 0;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  number++;
  robotList.push(`Robot-${number}`);
  console.log(robotList);
  const robotEl = document.createElement("div");
  const imgEl = document.createElement("img");
  imgEl.classList.add("robot_spritesheet");
  imgEl.classList.add("pixelart");
  imgEl.src = "./robot.png";
  imgEl.alt = "robot";
  imgEl.setAttribute("id", `imgRobot-${number}`);

  robotEl.appendChild(imgEl);
  robotEl.classList.add("robot");
  robotEl.setAttribute("id", `Robot-${number}`);
  gridEl.appendChild(robotEl);
  //const defaultRobotImage = document.getElementById("imgRobot-1");
  const robotImgCollection = document.getElementsByTagName("img");
  const robotImgCollectionArray = [...robotImgCollection];
  console.log(robotImgCollectionArray);
  const robotElCollection = document.getElementsByTagName("div");
  const robotElCollectionArray = [...robotElCollection];
  console.log(robotElCollectionArray);

  //create active robot selection
  const activeSelectDiv = document.createElement("div");
  activeSelectDiv.classList.add("activeSelect");
  const allActiveDiv = document.querySelectorAll(".activeSelect");
  //remove repeated created selection
  allActiveDiv.forEach((item) => {
    if (form.contains(item)) {
      form.removeChild(item);
    }
  });
  robotList.length == 0
    ? null
    : (activeSelectDiv.innerHTML = `<label for="activeSelect">Select active robot:</label>
          <select id="activeSelect">
          ${robotList
            .map((number) => {
              return `<option value=${number}>${number}</option>`;
            })
            .join("")} 
            <select/>     
            <input type="button" id='activeBtn' value='active' />
    `);

  form.appendChild(activeSelectDiv);
  const activeSelectEl = document.getElementById("activeSelect");
  const activeBtn = document.getElementById("activeBtn");

  activeBtn.addEventListener("click", () => {
    const activeRobot = activeSelectEl.value;
    console.log(activeRobot);
    targetRobotImg = robotImgCollectionArray.find(
      (item) => item.id === `img${activeRobot}`
    );
    console.log(targetRobotImg);
    targetRobotEl = robotElCollectionArray.find(
      (item) => item.id === `${activeRobot}`
    );
    console.log(targetRobotEl);
  });

  //set placed postion

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
        imgEl.classList.value = "robot_spritesheet pixelart face-back";
        break;
      case "EAST":
        imgEl.classList.value = "robot_spritesheet pixelart face-right";
        break;
      case "SOUTH":
        imgEl.classList.value = "robot_spritesheet pixelart";
        break;
      case "WEST":
        imgEl.classList.value = "robot_spritesheet pixelart face-left";
        break;

      default:
        break;
    }
  }
  //turn right
  const turnRight = () => {
    if (robotList.length >= 2 && !targetRobotImg) {
      alert("please activate the robot");
      return;
    }
    if (!targetRobotImg) {
      if (imgEl.classList.contains("face-back")) {
        imgEl.classList.value = "robot_spritesheet pixelart face-right";
      } else if (imgEl.classList.contains("face-left")) {
        imgEl.classList.value = "robot_spritesheet pixelart face-back";
      } else if (imgEl.classList.contains("face-right")) {
        imgEl.classList.value = "robot_spritesheet pixelart";
      } else {
        imgEl.classList.value = "robot_spritesheet pixelart face-left";
      }
    } else {
      if (targetRobotImg.classList.contains("face-back")) {
        targetRobotImg.classList.value =
          "robot_spritesheet pixelart face-right";
      } else if (targetRobotImg.classList.contains("face-left")) {
        targetRobotImg.classList.value = "robot_spritesheet pixelart face-back";
      } else if (targetRobotImg.classList.contains("face-right")) {
        targetRobotImg.classList.value = "robot_spritesheet pixelart";
      } else {
        targetRobotImg.classList.value = "robot_spritesheet pixelart face-left";
      }
    }
  };
  rightBtn.addEventListener("click", turnRight);

  //turn left
  leftBtn.addEventListener("click", () => {
    if (robotList.length >= 2 && !targetRobotImg) {
      alert("please activate the robot");
      return;
    }
    if (!targetRobotImg) {
      if (imgEl.classList.contains("face-back")) {
        imgEl.classList.value = "robot_spritesheet pixelart face-left";
      } else if (imgEl.classList.contains("face-left")) {
        imgEl.classList.value = "robot_spritesheet pixelart ";
      } else if (imgEl.classList.contains("face-right")) {
        imgEl.classList.value = "robot_spritesheet pixelart face-back";
      } else {
        imgEl.classList.value = "robot_spritesheet pixelart face-right";
      }
    } else {
      if (targetRobotImg.classList.contains("face-back")) {
        targetRobotImg.classList.value = "robot_spritesheet pixelart face-left";
      } else if (targetRobotImg.classList.contains("face-left")) {
        targetRobotImg.classList.value = "robot_spritesheet pixelart ";
      } else if (targetRobotImg.classList.contains("face-right")) {
        targetRobotImg.classList.value = "robot_spritesheet pixelart face-back";
      } else {
        targetRobotImg.classList.value =
          "robot_spritesheet pixelart face-right";
      }
    }
  });
  //move
  moveBtn.addEventListener("click", () => {
    if (robotList.length >= 2 && !targetRobotImg) {
      alert("please activate the robot");
      return;
    }
    if (!targetRobotImg || !targetRobotEl) {
      if (imgEl.classList.contains("face-back")) {
        if (y >= 0 && y <= 300) {
          y = y + 100;
          robotEl.style.bottom = `${y}px`;
        }
      } else if (imgEl.classList.contains("face-left")) {
        if (x > 0 && x <= 400) {
          x = x - 100;
          robotEl.style.left = `${x}px`;
        }
      } else if (imgEl.classList.contains("face-right")) {
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
    } else {
      if (targetRobotImg.classList.contains("face-back")) {
        if (y >= 0 && y <= 300) {
          y = y + 100;
          targetRobotEl.style.bottom = `${y}px`;
        }
      } else if (targetRobotImg.classList.contains("face-left")) {
        if (x > 0 && x <= 400) {
          x = x - 100;
          targetRobotEl.style.left = `${x}px`;
        }
      } else if (targetRobotImg.classList.contains("face-right")) {
        if (x >= 0 && x <= 300) {
          x = x + 100;
          targetRobotEl.style.left = `${x}px`;
        }
      } else {
        if (y > 0 && y <= 400) {
          y = y - 100;
          targetRobotEl.style.bottom = `${y}px`;
        }
      }
    }
  });
  //report
  reportBtn.addEventListener("click", () => {
    let facing_direction;
    if (!targetRobotImg) {
      if (imgEl.classList.contains("face-back")) {
        facing_direction = "NORTH";
      } else if (imgEl.classList.contains("face-left")) {
        facing_direction = "WEST";
      } else if (imgEl.classList.contains("face-right")) {
        facing_direction = "EAST";
      } else {
        facing_direction = "SOUTH";
      }
    } else {
      if (targetRobotImg.classList.contains("face-back")) {
        facing_direction = "NORTH";
      } else if (targetRobotImg.classList.contains("face-left")) {
        facing_direction = "WEST";
      } else if (targetRobotImg.classList.contains("face-right")) {
        facing_direction = "EAST";
      } else {
        facing_direction = "SOUTH";
      }
    }

    alert(
      `X: ${x / 100}. Y: ${
        y / 100
      }. Facing direction: ${facing_direction}. The number of robots: ${
        robotList.length
      }. The active robot is: ${targetRobotEl ? targetRobotEl.id : "Robot-1"}`
    );
  });
});
