const Field = require('../src/gameElements/Field');

describe('Field class tests', () => {
  it('draws the field with right dimensions', () => {
    const config = {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100)
    };
    const drawerMock = getDrawerMock();
    spyOn(drawerMock, 'rect');
    spyOn(drawerMock, 'fill');
    
    const field = new Field(drawerMock, config);
    field.draw();

    const expectedSquareSide = 10;
    const expectedFillRgbColour = [50, 250, 50];
    expect(drawerMock.fill).toHaveBeenCalledWith(...expectedFillRgbColour);
    expect(drawerMock.rect).toHaveBeenCalledWith(0, 0, config.width * expectedSquareSide, config.height * expectedSquareSide);
  });

  it('draws the field with right squares positions', () => {
    const config = {
      width: 100, height: 100
    };
    const drawerMock = getDrawerMock();
    spyOn(drawerMock, 'square');
    const expectedSquareSide = 10;
    
    const field = new Field(drawerMock, config);
    field.draw();

    expect(drawerMock.square.calls.allArgs()).toEqual(
      buildSquareArgsArray(config.width, config.height, expectedSquareSide)
    );
  });

  it('draws food on the field', () => {
    const config = {
      width: 10, height: 10
    };
    const drawerMock = getDrawerMock();
    spyOn(drawerMock, 'fill');

    const field = new Field(drawerMock, config);
    const foodLocation = field.getFood();
    field.draw();

    //console.info(foodLocation, foodLocation.x * config.width + foodLocation.y);
    expect(drawerMock.fill.calls.argsFor(foodLocation.x * config.width + foodLocation.y)).toEqual(
        [0]
      );
  });

  it('generates new food when draw is called and food is eaten', () => {
    const config = {
      width: 5, height: 5
    };
    const drawerMock = getDrawerMock();
    const field = new Field(drawerMock, config);
    const foodLocation = field.getFood();
    field.eatFood()
    field.draw();

    expect(field.getFood()).not.toEqual(foodLocation);
  });

  it('doesnt generate new food where theres snake', () => {
    const config = {
      width: 5, height: 5
    };
    const drawerMock = getDrawerMock();
    const field = new Field(drawerMock, config);

    const snakeMock = {
      isSnake: () => {},
    };
    spyOn(snakeMock, 'isSnake').and.returnValues([
      true,
      false
    ]);
    field.setSnake(snakeMock);

    const foodLocation = field.eatFood();
    expect(snakeMock.isSnake).toHaveBeenCalledTimes(2);
  });

  it('draws the snake on the field', () => {
    const config = {
      width: 3, height: 3
    };
    const drawerMock = getDrawerMock();
    const snakeMock = {
      isSnake: () => {},
    };

    const snakeCoordinatesMap = {
      1: {0: true, 1: true},
      2: {0: true},
    };
    spyOn(drawerMock, 'fill');
    spyOn(snakeMock, 'isSnake').and.callFake((x, y) => {
      return snakeCoordinatesMap[x] && snakeCoordinatesMap[x][y];
    });
    
    const field = new Field(drawerMock, config);
    field.setSnake(snakeMock);
    field.draw();

    const freeSpotColour = 255;
    const snakeSpotColour = 0;
    expect(drawerMock.fill.calls.allArgs()).toEqual(
      [
        [freeSpotColour],
        [freeSpotColour],
        [freeSpotColour],
        [snakeSpotColour],
        [snakeSpotColour],
        [freeSpotColour],
        [snakeSpotColour],
        [freeSpotColour],
        [freeSpotColour]
      ]
    );
  });

  function buildSquareArgsArray(width, height, expectedSquareSide) {
    const squaresArgs = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        squaresArgs.push([i * expectedSquareSide, j * expectedSquareSide, expectedSquareSide]);
      }
    }
    return squaresArgs;
  }

  function getDrawerMock() {
    return {
      'rect': () => {},
      'square': () => {},
      'fill': () => {},
      'stroke': () => {},
    };
  }
});