function GameLoop(config = {}) {
  const size = config.size ?? 500;
  const speed = config.speed ?? 10;

  let direction = 'right';
  let drawer = null;

  this.setDrawer = (p5Closure) => {
    drawer = p5Closure;
  };

  this.setup = () => {
    drawer.createCanvas(size, size);
    drawer.frameRate(speed);
  };

  this.setDirection = (inputDirection) => {
    direction = inputDirection;
  };

  this.getDirection = () => {
    return direction;
  }
}

module.exports = GameLoop;