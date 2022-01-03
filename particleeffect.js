const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Mouse Porperties

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// create Particles

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Method to draw

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "pink";
    ctx.fill();
  }

  // check position, check mouse position, move the particle, draw.

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.width || this.y < 0) {
      this.directionY = -this.directionY;
    }
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x += 10;
      }
      if (mouse.y < this.y && this.y < canvas.height) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    //Move particle
    this.x += this.directionX;
    this.y += this.directionY;
    //Draw Particle
    this.draw();
  }
}

const init = () => {
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2) - size * 2;
    let y = Math.random() * (innerHeight - size * 2) - size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "pink";

    particles.push(new Particle(x, y, directionX, directionY, size, color));
  }
};

// console.log(particles);
// particles.forEach((particle) => particle.draw());

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle) => particle.update());
  connect();
};

const connect = () => {
  let opacityValue = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let distance =
        (particles[i].x - particles[j].x) * (particles[i].x - particles[j].x) +
        (particles[i].y - particles[j].y) * (particles[i].y - particles[j].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        ctx.strokeStyle = `rgba(255, 192, 203, ${
          opacityValue - distance / 20000
        })`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
};

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.height / 80);
  init();
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
  mouse.radius = 0;
});
init();
animate();
