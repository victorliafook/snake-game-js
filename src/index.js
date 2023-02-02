const p5 = require('p5');
const GameLoop = require('../src/GameLoop');
const Field = require('../src/Field');
const Snake = require('../src/Snake');
const Screens = require('../src/Screens');

const gameConfig = {
  size: 500,
  speed: 20,
};
const game = new GameLoop(gameConfig);

new p5(function(closure) {
  const snakeField = new Field(closure, {width: 50, height: 50});
  const snake = new Snake({maxHorizontal: 50, maxVertical: 50});
  const screens = new Screens(closure);

  game.setDrawer(closure);
  game.setField(snakeField);
  game.setSnake(snake);
  game.setScreens(screens);
  
  closure.setup = game.setup;
  closure.draw = game.update;

}, document.getElementById('main-canvas'));

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