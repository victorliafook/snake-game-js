function Field(drawer, config = {}) {
  const squareSide = 10;
  const width = config.width ?? 50;
  const height = config.height ?? 50;
  let snake = null;

  this.draw = () => {
    drawer.rect(0, 0, width * squareSide, height * squareSide);

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (hasSnake(i, j)) {
          drawer.fill(0);
        } else {
          drawer.fill(255);
        }
        drawer.square(i * squareSide, j * squareSide, squareSide);
      }
    }
  };

  this.setSnake = (that) => {
    snake = that;
  };

  function hasSnake(x, y) {
    return !!snake === false ? false : snake.isSnake(x, y);
  }
}

module.exports = Field;