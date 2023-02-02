function GameLoop(config = {}) {
  const size = config.size ?? 500;
  const speed = config.speed ?? 10;

  let direction = 'right';
  let screens = null;
  let drawer = null;
  let field = null;
  let snake = null;

  this.setup = () => {
    drawer.createCanvas(size, size);
    drawer.frameRate(speed);
  };

  this.update = () => {
    field && field.draw();
    if (snake?.isAlive()) {
      snake.move(direction);
    } else {
      screens?.showGameOver();
    }
  };

  this.setDrawer = (p5Closure) => {
    drawer = p5Closure;
  };

  this.setScreens = (screensInput) => {
    screens = screensInput;
  };

  this.setDirection = (inputDirection) => {
    direction = inputDirection;
  };

  this.getDirection = () => {
    return direction;
  }

  this.setField = (inputField) => {
    field = inputField;
    snake?.setField(field);
    snake && field.setSnake(snake);
  };

  this.setSnake = (inputSnake) => {
    snake = inputSnake;
    field?.setSnake(snake);
    field && snake.setField(field);
  };
}

module.exports = GameLoop;