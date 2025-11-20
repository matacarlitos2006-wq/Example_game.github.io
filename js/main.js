const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const catImg = new Image();
catImg.src = 'assets/images/cat.png';
const dogImg = new Image();
dogImg.src = 'assets/images/dog.png';

let player;
let world;

function init() {
  player = new Player(100, 100, catImg);
  world = new World(ctx);
  world.spawnDogs(5, dogImg);

  gameLoop();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  player.update();
  world.update();

  // Attack when space is pressed
  if (input.keys[' ']) {
    player.attack(world.dogs);
  }

  // Maybe filter out dead dogs, or you can keep them but make them invisible
  world.dogs = world.dogs.filter(dog => dog.alive);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  world.draw();
}

catImg.onload = function() {
  dogImg.onload = function() {
    init();
  };
};

