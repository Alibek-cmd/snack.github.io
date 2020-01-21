const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");
const map = new Image();
map.src = "img/map.png";

const appleImg = new Image();
appleImg.src = "img/apple.png";

const snackHead = new Image();
snackHead.src = "img/snack_head.png";

const snackTail = new Image();
snackTail.src = "img/snack_tail.png";

let box = 32;
let score = 0;

var game = setInterval(drawGame, 150);
var apple;
createApple();

let snack = [];
snack[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);
canvas.addEventListener("click", checkClick);

let dir;

function direction(event) {
  let index = event.keyCode;
  if (index == 37 && dir != "right")
  dir = "left";
  else if (index == 38 && dir != "down")
  dir = "up";
  else if (index == 39 && dir != "left")
  dir = "right";
  else if (index == 40 && dir != "up")
  dir = "down";
}

function drawGame() {

  ctx.drawImage(map, 0, 0);

  ctx.drawImage(appleImg, apple.x, apple.y);

  checkForApple();

  ctx.fillStyle = "red";
  ctx.font = "24px Roboto";
  ctx.fillText("Restart", 495, 45);

  ctx.drawImage(snackHead, snack[0].x, snack[0].y);
  for (let i=1; i<snack.length; i++) {
    ctx.drawImage(snackTail, snack[i].x, snack[i].y);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Roboto";
  ctx.fillText(score, box * 2, box * 1.7);

  outOfBorder();
  move();
  eatTail();
}

function checkForApple() {
  if (snack[0].x == apple.x && snack[0].y == apple.y) {
    score++;
    createApple();
    createRect();
  }
}

function checkClick(e) {
  if (e.clientX > 875 && e.clientX < 950 && e.clientY > 30 && e.clientY < 55) {
    restart();
  }
}

function restart() {
  score = 0;
  snack.length = 1;
  snack[0] = {
    x: 9 * box,
    y: 10 * box
  }
  dir = null;
  game = setInterval(drawGame, 300);
}

function eatTail() {
  for (let i = 1; i < snack.length; i++) {
    if (snack[0].x == snack[i].x && snack[0].y == snack[i].y) {
      clearInterval(game);
      ctx.fillStyle = "white";
      ctx.font = "50px Roboto";
      ctx.fillText("Game Over!", box*5.5, box*11);
      return;
    }
  }
}

function outOfBorder() {
  if (snack[0].x < box) snack[0].x = box*17;
  else if (snack[0].x > box*17) snack[0].x = box;
  else if (snack[0].y < box*3) snack[0].y = box*17;
  else if (snack[0].y > box*17) snack[0].y = box*3;
}

function createApple() {
  apple = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
  };
}

function createRect() {
  let rect = {
    x: snack[snack.length - 1].x,
    y: snack[snack.length - 1].y
  }
  snack.push(rect);
}

function move() {
  for (let i = snack.length - 1; i > 0; i--) {
    snack[i].x = snack[i-1].x;
    snack[i].y = snack[i-1].y;
  }
  if (dir == "left") snack[0].x -= box;
  else if (dir == "right") snack[0].x += box;
  else if (dir == "up") snack[0].y -= box;
  else if (dir == "down") snack[0].y += box;
}
