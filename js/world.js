class World {
  constructor(ctx) {
    this.ctx = ctx;
    this.dogs = [];
  }

  spawnDogs(num, img) {
    for (let i = 0; i < num; i++) {
      const x = Math.random() * (800 - 40);
      const y = Math.random() * (600 - 40);
      this.dogs.push(new Dog(x, y, img));
    }
  }

  update() {
    for (let dog of this.dogs) {
      dog.update();
    }
  }

  draw() {
    for (let dog of this.dogs) {
      dog.draw(this.ctx);
    }
  }
}

