function Field(drawer, config = {}) {
  const squareSide = 10;
  const width = config.width ?? 50;
  const height = config.height ?? 50;
  let food = null
  let snake = null;

  this.draw = () => {
    this.getFood();
    drawer.rect(0, 0, width * squareSide, height * squareSide);
    let cont = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (hasSnake(i, j) || this.hasFood(i, j)) {
          drawer.fill(0);
        } else {
          drawer.fill(255);
        }
        cont++;
        drawer.square(i * squareSide, j * squareSide, squareSide);
      }
    }
  };

  this.setSnake = (that) => {
    snake = that;
  };

  this.getFood = () => {
    if (food === null) {
      food = {
        x: Math.floor(width * Math.random()),
        y: Math.floor(height * Math.random()),
      };
    }

    return { ...food };
  }

  this.eatFood = () => {
    const foodEaten = { ...food };
    food = null;
    while ((this.getFood().x === foodEaten.x && this.getFood().y === foodEaten.y) || hasSnake(this.getFood().x, this.getFood().y)) {
      console.info('generated invalid food! trying again');
      food = null;
    }
  };

  this.hasFood = (x, y) => {
    if (food === null) return false;

    return x === food.x && y === food.y;
  }

  function hasSnake(x, y) {
    return !!snake === false ? false : snake.isSnake(x, y);
  }
}

module.exports = Field;