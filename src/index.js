const p5 = require('p5');
const Field = require('../src/Field');
const Snake = require('./Snake');

const game = {
  direction: 'up',
};

window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      if (game.direction !== 'up')
        game.direction = 'down';
      break;
    case 'ArrowLeft':
      if (game.direction !== 'right')
        game.direction = 'left';
      break;
    case 'ArrowDown':
      if (game.direction !== 'down')
        game.direction = 'up';
      break;
    case 'ArrowRight':
      if (game.direction !== 'left')
        game.direction = 'right';
      break;
    default:
      break;
  }
});

new p5(function(closure) {
  const snakeField = new Field(closure, {width: 50, height: 50});
  const snake = new Snake({maxHorizontal: 50, maxVertical: 50});
  snakeField.setSnake(snake);
  snake.setField(snakeField);

  closure.setup = () => {
    closure.createCanvas(500, 500);
    closure.frameRate(10);
  }
  
  closure.draw = () => {
    if (snake.isAlive()) {
      snake.move(game.direction);
    }
    snakeField.draw();
  };
}, document.getElementById('main-canvas'));