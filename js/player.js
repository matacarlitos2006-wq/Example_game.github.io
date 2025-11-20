class Player {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.img = img; // Image object
    this.width = 50;
    this.height = 50;
  }

  update() {
    // Movement with WASD or arrows
    if (input.keys['ArrowUp'] || input.keys['w']) this.y -= this.speed;
    if (input.keys['ArrowDown'] || input.keys['s']) this.y += this.speed;
    if (input.keys['ArrowLeft'] || input.keys['a']) this.x -= this.speed;
    if (input.keys['ArrowRight'] || input.keys['d']) this.x += this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  attack(dogs) {
    // Simple attack logic: check collision with dogs
    for (let dog of dogs) {
      const dx = dog.x - this.x;
      const dy = dog.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 60) { // attack range
        dog.alive = false;
      }
    }
  }
}

