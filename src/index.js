const p5 = require('p5');
const Field = require('../src/Field');
const Snake = require('./Snake');

const game = {
  direction: 'up',
};

window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      game.direction = 'up';
      break;
    case 'ArrowLeft':
      game.direction = 'left';
      break;
    case 'ArrowDown':
      game.direction = 'down';
      break;
    case 'ArrowRight':
      game.direction = 'right';
      break;
    default:
      break;
  }
});

new p5(function(closure) {
  const snakeField = new Field(closure, {width: 10, height: 10});
  const snake = new Snake({maxHorizontal: 10, maxVertical: 10});
  snakeField.setSnake(snake);

  closure.setup = () => {
    closure.createCanvas(100, 100);
    closure.frameRate(10);
  }
  
  closure.draw = () => {
    snake.move(game.direction);
    snakeField.draw();
  };
}, document.getElementById('main-canvas'));