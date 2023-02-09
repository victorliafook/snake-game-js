function GameLoop(config = {}) {
  const size = config.size ?? 500;
  const speed = config.speed ?? 10;

  let direction = 'right';
  let screens = null;
  let stats = null;
  let drawer = null;
  let field = null;
  let snake = null;

  this.setup = () => {
    const canvasHeight = size + (stats?.getPanelHeight() ?? 0);
    drawer.createCanvas(size, canvasHeight);
    drawer.frameRate(speed);
  };

  this.update = () => {
    drawer?.clear();
    field && field.draw();
    if (snake?.isAlive()) {
      snake.move(direction);
    } else {
      screens?.showGameOver();
    }
    stats?.setScore(snake.getLength() - snake.getInitialLength());
    stats?.draw();
  };

  this.setDrawer = (p5Closure) => {
    drawer = p5Closure;
  };

  this.setScreens = (screensInput) => {
    screens = screensInput;
  };

  this.setStats = (statsInput) => {
    stats = statsInput;
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