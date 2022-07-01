//initialize varibales
const form = document.querySelector("[data-js=new-position-form]");
const xEl = document.querySelector("[data-js=position-x]");
const yEl = document.querySelector("[data-js=position-y]");
const fEl = document.querySelector("[data-js=direction-f]");
const rightBtn = document.querySelector("[data-js=turn-right]");
const leftBtn = document.querySelector("[data-js=turn-left]");
const moveBtn = document.querySelector("[data-js=move-robot]");
const reportBtn = document.querySelector("[data-js=report-btn]");
const reportrobotEl = document.querySelector("[data-js=report-robot-div]");
const boardEl = document.querySelector("[data-js=board]");
const activeRobotEl = document.querySelector("[data-js=activate-container]");
const activeForm = document.querySelector("[data-js=activate-form]");
const modalEl = document.querySelector("[data-js=modal]");
const closemodalBtn = document.querySelector("[data-js=close-popup-btn]");
const overlayEl = document.querySelector("[data-js=overlay]");
const modalbodyEL = document.querySelector("[data-js=modal-body]");

let robotList = [];
let x = 0;
let y = 0;
let targetRobotImg;
let targetRobotEl;
let number = 0;
let imgEl;
let robotEl;

//to toggle the dropdown menu
document.addEventListener("click", (e) => {
  const isDropdownBtn = e.target.matches("[data-dropdown-btn]");
  //if it is in the drop down menu, do nothing.
  if (!isDropdownBtn && e.target.closest("[data-dropdown]") != null) {
    return;
  }
  let currentDropdown;
  if (isDropdownBtn) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) {
      return;
    }
    dropdown.classList.remove("active");
  });
});
//place a new robot in a certain position facing a certain direction
form.addEventListener("submit", (e) => {
  e.preventDefault();

  number++;
  robotList.push(`Robot-${number}`);
  console.log(robotList);

  if (robotList.length != 0) {
    activeRobotEl.classList.add("show-activebtn");
    reportrobotEl.classList.add("show-activebtn");
  }

  robotEl = document.createElement("div");

  imgEl = document.createElement("img");
  imgEl.classList.add("robot_spritesheet");
  imgEl.classList.add("pixelart");
  imgEl.src = "./robot.png";
  imgEl.alt = "robot";
  imgEl.setAttribute("id", `imgRobot-${number}`);

  robotEl.appendChild(imgEl);
  robotEl.classList.add("robot");
  robotEl.setAttribute("id", `Robot-${number}`);
  boardEl.appendChild(robotEl);

  const robotImgCollection = document.getElementsByTagName("img");
  const robotImgCollectionArray = [...robotImgCollection];
  //console.log(robotImgCollectionArray);

  const robotElCollection = document.getElementsByTagName("div");
  const robotElCollectionArray = [...robotElCollection];
  //console.log(robotElCollectionArray);

  //the default first robot
  targetRobotImg = robotImgCollection.namedItem("imgRobot-1");
  targetRobotEl = robotElCollection.namedItem("Robot-1");

  //create active robot selection
  const activeSelectDiv = document.createElement("div");
  activeSelectDiv.classList.add("activeSelect");
  const allActiveDiv = document.querySelectorAll(".activeSelect");

  allActiveDiv.forEach((item) => {
    if (activeForm.contains(item)) {
      activeForm.removeChild(item);
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

  activeForm.appendChild(activeSelectDiv);

  const activeSelectEl = document.getElementById("activeSelect");
  const activeBtn = document.getElementById("activeBtn");

  activeBtn.addEventListener("click", () => {
    let activeRobot = "Robot-1";
    activeRobot = activeSelectEl.value;
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

  //set placed postion and direction
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
});

//report
reportBtn.addEventListener("click", () => {
  let facing_direction;

  if (targetRobotImg.classList.contains("face-back")) {
    facing_direction = "NORTH";
  } else if (targetRobotImg.classList.contains("face-left")) {
    facing_direction = "WEST";
  } else if (targetRobotImg.classList.contains("face-right")) {
    facing_direction = "EAST";
  } else {
    facing_direction = "SOUTH";
  }
  modalbodyEL.innerHTML = `<div><p>Active Robot Position: X: ${Math.trunc(
    x / 100
  )}. Y: ${Math.trunc(y / 100)}</p>
          <p>Facing direction: ${facing_direction}</p>
          <p>The number of robots: ${robotList.length}</p>
          <p>The active robot is: ${
            targetRobotEl ? targetRobotEl.id : "Robot-1"
          }</p></div>`;
  modalEl.classList.add("active");
  overlayEl.classList.add("active");
  // alert(
  //   `Position: X: ${x / 100}. Y: ${y / 100}.
  //    Facing direction: ${facing_direction}.
  //    The number of robots: ${robotList.length}.
  //    The active robot is: ${targetRobotEl ? targetRobotEl.id : "Robot-1"}`
  // );
});

//close report popup
closemodalBtn.addEventListener("click", () => {
  modalEl.classList.remove("active");
  overlayEl.classList.remove("active");
  modalbodyEL.innerHTML = ``;
});

//turn right
const turnRight = () => {
  if (targetRobotImg.classList.contains("face-back")) {
    targetRobotImg.classList.value = "robot_spritesheet pixelart face-right";
  } else if (targetRobotImg.classList.contains("face-left")) {
    targetRobotImg.classList.value = "robot_spritesheet pixelart face-back";
  } else if (targetRobotImg.classList.contains("face-right")) {
    targetRobotImg.classList.value = "robot_spritesheet pixelart";
  } else {
    targetRobotImg.classList.value = "robot_spritesheet pixelart face-left";
  }
};
rightBtn.addEventListener("click", turnRight);

//turn left
leftBtn.addEventListener("click", () => {
  if (targetRobotImg.classList.contains("face-back")) {
    targetRobotImg.classList.value = "robot_spritesheet pixelart face-left";
  } else if (targetRobotImg.classList.contains("face-left")) {
    targetRobotImg.classList.value = "robot_spritesheet pixelart ";
  } else if (targetRobotImg.classList.contains("face-right")) {
    targetRobotImg.classList.value = "robot_spritesheet pixelart face-back";
  } else {
    targetRobotImg.classList.value = "robot_spritesheet pixelart face-right";
  }
});

//move
moveBtn.addEventListener("click", () => {
  if (targetRobotImg.classList.contains("face-back")) {
    if (y >= 15 && y <= 225) {
      y = y + 70;
      targetRobotEl.style.bottom = `${y}px`;
    }
  } else if (targetRobotImg.classList.contains("face-left")) {
    if (x > 10 && x <= 290) {
      x = x - 70;
      targetRobotEl.style.left = `${x}px`;
    }
  } else if (targetRobotImg.classList.contains("face-right")) {
    if (x >= 10 && x <= 220) {
      x = x + 70;
      targetRobotEl.style.left = `${x}px`;
    }
  } else {
    if (y > 15 && y <= 295) {
      y = y - 70;
      targetRobotEl.style.bottom = `${y}px`;
    }
  }
});
