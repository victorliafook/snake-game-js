function Field(drawer, config = {}) {
  const squareSide = 10;
  const width = config.width ?? 50;
  const height = config.height ?? 50;
  this.draw = () => {
    drawer.rect(0, 0, width * squareSide, height * squareSide);

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        drawer.square(i * squareSide, j * squareSide, squareSide);
      }
    }
  };
}

module.exports = Field;