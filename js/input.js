const input = {
  keys: {},
  mouse: { x: 0, y: 0 },
};

window.addEventListener('keydown', function(e) {
  input.keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
  input.keys[e.key] = false;
});

window.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  input.mouse.x = e.clientX - rect.left;
  input.mouse.y = e.clientY - rect.top;
});

