$(document).ready(function () {
    const player = $('#player');
    const gameContainer = $('#game-container');
    const scoreDisplay = $('#score');
    const livesDisplay = $('#lives');
    let score = 0;
    let lives = 5;
    let enemies = [];
    let bullets = [];
    let moveDirection = 0;
    let isGameOver = false;
    let enemyInterval;
  
    $(document).keydown(function (e) {
      if (isGameOver) return;
      if (e.key === 'ArrowLeft') moveDirection = -3;
      if (e.key === 'ArrowRight') moveDirection = 3;
      if (e.key === ' ') shoot();
    });
  
    $(document).keyup(function () {
      moveDirection = 0;
    });
  
    function movePlayer() {
      const currentLeft = parseFloat(player.css('left'));
      const newLeft = currentLeft + moveDirection;
      if (newLeft >= 0 && newLeft <= gameContainer.width() - player.width()) {
        player.css('left', newLeft);
      }
    }
  
    function shoot() {
      const bullet = $('<div class="bullet"></div>');
      bullet.css({
        left: parseFloat(player.css('left')) -5,
        bottom: parseFloat(player.css('bottom')) + 50
      });
      gameContainer.append(bullet);
      bullets.push(bullet);
    }
  
    function createEnemy() {
      const enemy = $('<div class="enemy"></div>');
      enemy.css({
        left: Math.random() * (gameContainer.width() - 40),
        top: 0
      });
      gameContainer.append(enemy);
      enemies.push(enemy);
    }
  
    function checkCollision(element1, element2) {
      const rect1 = element1[0].getBoundingClientRect();
      const rect2 = element2[0].getBoundingClientRect();
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }
  
    function gameOver() {
      $('#game-over').show();
      $('#final-score').text(score);
      clearInterval(enemyInterval);
      isGameOver = true;
    }
  
    function gameLoop() {
      if (isGameOver) return;
      movePlayer();
  
      bullets.forEach((bullet, bIndex) => {
        const currentBottom = parseFloat(bullet.css('bottom'));
        bullet.css('bottom', currentBottom + 10);
        if (currentBottom > gameContainer.height()) {
          bullet.remove();
          bullets.splice(bIndex, 1);
        }
      });
  
      enemies.forEach((enemy, eIndex) => {
        const currentTop = parseFloat(enemy.css('top'));
        enemy.css('top', currentTop + 2);
        if (currentTop > gameContainer.height()) {
          enemy.remove();
          enemies.splice(eIndex, 1);
          lives--;
          livesDisplay.text(`Lives: ${lives}`);
          if (lives <= 0) {
            gameOver();
          }
        }
      });
  
      bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
          if (checkCollision(bullet, enemy)) {
            bullet.remove();
            enemy.remove();
            bullets.splice(bIndex, 1);
            enemies.splice(eIndex, 1);
            score += 10;
            scoreDisplay.text(`Score: ${score}`);
          }
        });
      });
  
      requestAnimationFrame(gameLoop);
    }
  
    enemyInterval = setInterval(createEnemy, 1500);
    gameLoop();
  
    // 📱 Touch Controls
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      $('#touch-controls').show();
  
      $('#left-btn').on('touchstart', () => moveDirection = -3);
      $('#right-btn').on('touchstart', () => moveDirection = 3);
      $('#left-btn, #right-btn').on('touchend', () => moveDirection = 0);
      $('#shoot-btn').on('touchstart', () => shoot());
    }
  });
  
