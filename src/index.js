const p5 = require('p5');
const GameLoop = require('../src/GameLoop');
const Field = require('../src/Field');
const Snake = require('./Snake');

// const games = {
//   direction: 'right',
// };

const gameConfig = {
  size: 500,
  speed: 20,
};
const game = new GameLoop(gameConfig);

window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      if (game.getDirection() !== 'up')
        game.setDirection('down');
      break;
    case 'ArrowLeft':
      if (game.getDirection() !== 'right')
        game.setDirection('left');
      break;
    case 'ArrowDown':
      if (game.getDirection() !== 'down')
        game.setDirection('up');
      break;
    case 'ArrowRight':
      if (game.getDirection() !== 'left')
        game.setDirection('right');
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

  game.setDrawer(closure);
  closure.setup = game.setup;
  
  closure.draw = () => {
    snakeField.draw();
    
    if (snake.isAlive()) {
      snake.move(game.getDirection());
    } else {
      closure.textSize(70);
      closure.fill(0, 0, 0);
      closure.text('GAME OVER', 40, 230);
    }
  };
}, document.getElementById('main-canvas'));