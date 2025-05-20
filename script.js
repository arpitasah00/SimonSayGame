let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;

// High score logic
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;

    levelUp();
  }
});

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// audio functions

function playSound() {
  let audio = new Audio(`audios/sounds.mp3`);
  audio.play();
}
function playSound(wrong) {
  if (wrong === "wrong") {
    let audio = new Audio("audios/wrong.mp3");
    audio.play();
  } else {
    let audio = new Audio(`audios/sounds.mp3`);
    audio.play();
  }
}
function levelUp() {
  level++;
  h2.innerText = `Level ${level}`;

  // choose random btn & push to gameSeq

  let randIndex = Math.floor(Math.random() * 3);
  let randColor = btns[randIndex];
  let randbtn = document.querySelector(`.${randColor}`);
  btnFlash(randbtn);
  gameSeq.push(randColor);
  playSound(randColor);
}

// function to play the game

function checkAnswer(currentLevel) {
  if (userSeq[currentLevel] === gameSeq[currentLevel]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(function () {
        userSeq = [];
        levelUp();
      }, 1000);
    }
  } else {
    // Update high score if needed
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
    }
    h2.innerHTML = `Game Over!! Your Score is <b>${level}</b> <br> Highest Score: <b>${highScore}</b> <br> Press Any Key to Restart`;
    playSound("wrong");

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    resetGame();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
  btn.addEventListener("click", btnPress);
});

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
