const Field = require('../src/Field');

describe('Field class tests', () => {
  it('draws the field with right dimensions', () => {
    const config = {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
    };
    const drawerMock = {
      'rect': () => {},
      'square': () => {},
    };
    spyOn(drawerMock, 'rect');
    const field = new Field(drawerMock, config);
    field.draw();

    const expectedSquareSide = 10;
    expect(drawerMock.rect).toHaveBeenCalledWith(0, 0, config.width * expectedSquareSide, config.height * expectedSquareSide);
  });

  it('draws the field with right squares positions', () => {
    const config = {
      width: 100, height: 100
    };
    const drawerMock = {
      'rect': () => {},
      'square': () => {},
    };
    spyOn(drawerMock, 'square');
    const field = new Field(drawerMock, config);
    field.draw();

    const expectedSquareSide = 10;
    expect(drawerMock.square.calls.allArgs()).toEqual(
      buildSquares(config.width, config.height, expectedSquareSide)
    );
  });

  function buildSquares(width, height, expectedSquareSide) {
    const squaresArgs = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        squaresArgs.push([i * expectedSquareSide, j * expectedSquareSide, expectedSquareSide]);
      }
    }
    return squaresArgs;
  }
});