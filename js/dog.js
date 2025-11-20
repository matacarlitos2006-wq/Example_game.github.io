class Dog {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = 40;
    this.height = 40;
    this.alive = true;
  }

  update() {
    // For now, dogs don't move. You can add AI later.
  }

  draw(ctx) {
    if (this.alive) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}

