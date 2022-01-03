const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

const colorArray = [
  "white",
  "pink",
  "cornsilk",
  "skyblue",
  "aquamarine",
  "sandybrown",
];
const maxSize = 20;
const minSize = 0;
mouseRadius = 60;

//mouse

let mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}
// //   // Place draw method on prototype

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  // ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.stroke();
};

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x + this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y + this.size < 0) {
    this.directionY = -this.directionY;
  }

  this.x += this.directionX;
  this.y += this.directionY;

  if (
    mouse.x - this.x < mouseRadius &&
    mouse.x - this.x > -mouseRadius &&
    mouse.y - this.y < mouseRadius &&
    mouse.y - this.y > -mouseRadius
  ) {
    if (this.size < maxSize) {
      this.size += 3;
    }
  } else if (this.size > minSize) {
    this.size -= 0.1;
  }

  if (this.size < 0) {
    this.size = 0;
  }
  this.draw();
};

function init() {
  for (let i = 0; i < 1000; i++) {
    let size = 0;
    let x = Math.random() * (innerWidth - size * 2) - size * 2;
    let y = Math.random() * (innerHeight - size * 2) - size * 2;
    let directionX = Math.random() * 0.2 - 0.1;
    let directionY = Math.random() * 0.2 - 0.1;
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// setInterval(() => {
//   mouse.x = null;
//   mouse.y = null;
// }, 1000);

// console.log(particleArray);
// const particle1 = new Particle(100, 100, 1, 1, 20, "white");
// console.log(particle1);

// particle1.draw();
