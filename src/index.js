const p5 = require('p5');
const GameLoop = require('../src/GameLoop');
const Field = require('../src/Field');
const Snake = require('../src/Snake');
const Screens = require('../src/Screens');
const Stats = require('./Stats');
require('../styles/main.css');
require('../styles/controls.css');

const gameConfig = {
  size: 500,
  speed: 20,
};
const game = new GameLoop(gameConfig);

new p5(function(closure) {
  const snakeField = new Field(closure, {width: 50, height: 50});
  const snake = new Snake({maxHorizontal: 50, maxVertical: 50});
  const screens = new Screens(closure);
  const statsDisplay = new Stats(closure);

  game.setDrawer(closure);
  game.setField(snakeField);
  game.setSnake(snake);
  game.setScreens(screens);
  game.setStats(statsDisplay);
  
  closure.setup = game.setup;
  closure.draw = game.update;

}, document.getElementById('main-canvas'));

const directionalEventHandler = (event) => {
  switch(event) {
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
};

window.addEventListener('keydown', (event) => directionalEventHandler(event.key));

document.querySelector('#controls #up').addEventListener('click', (e) => {
  directionalEventHandler('ArrowUp');
});

document.querySelector('#controls #left').addEventListener('click', () => {
  directionalEventHandler('ArrowLeft');
});

document.querySelector('#controls #right').addEventListener('click', () => {
  directionalEventHandler('ArrowRight');
});

document.querySelector('#controls #down').addEventListener('click', () => {
  directionalEventHandler('ArrowDown');
});