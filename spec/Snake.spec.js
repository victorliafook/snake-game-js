const Snake = require('../src/Snake');

const expectedInitialSnakeLength = 3;
const expectedInitialHeadPosition = { x: 5, y: 5 };

describe('Snake class tests', () => {
  it(`snake starts with length ${expectedInitialSnakeLength}`, () => {
    const snake = new Snake();
    expect(snake.getLength()).toBe(expectedInitialSnakeLength);
  });

  it(`snake starts with heat at position ${expectedInitialHeadPosition.x}, ${expectedInitialHeadPosition.y}`, () => {
    const snake = new Snake();
    expect(snake.getHead()).toEqual(expectedInitialHeadPosition);
  });

  const movementDirectionsCases = [
    { direction: 'up', x: 0, y: 1 },
    { direction: 'right', x: 1, y: 0 },
    { direction: 'down', x: 0, y: -1 },
    { direction: 'left', x: -1, y: 0 },
  ];
  
  movementDirectionsCases.forEach(testCase => {
    it(`snake moves ${testCase.direction}`, () => {
      const initialState = {
        length: 1,
      };
      const snake = new Snake(initialState);
  
      const expectedCoordinate = {
        x: expectedInitialHeadPosition.x + testCase.x,
        y: expectedInitialHeadPosition.y + testCase.y
      };
      expect(snake.move(testCase.direction)).toEqual(expectedCoordinate);

      expectedCoordinate.x += testCase.x;
      expectedCoordinate.y += testCase.y;
      expect(snake.move(testCase.direction)).toEqual(expectedCoordinate);
    });
  });

  it('snake keeps same length while moving', () => {
    const initialState = {
      length: 3,
    };
    const snake = new Snake(initialState);
    snake.move('up');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 5, y: 4}, {x: 5, y: 5}, {x: 5, y: 6}]
    );

    snake.move('up');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}]
    );

    snake.move('up');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 5, y: 6}, {x: 5, y: 7}, {x: 5, y: 8}]
    );
  });

  it('snake retracts from path while moving', () => {
    const initialState = {
      length: 3,
    };
    const snake = new Snake(initialState);
    snake.move('left');
    expect(snake.getSegments()).toEqual(
      [{x: 5, y: 4}, {x: 5, y: 5}, {x: 4, y: 5}]
    );

    snake.move('down');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 5, y: 5}, {x: 4, y: 5}, {x: 4, y: 4}]
    );

    snake.move('right');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 4, y: 5}, {x: 4, y: 4}, {x: 5, y: 4}]
    );
    expect(snake.isAlive()).toBeTrue();
  });

  it('snake loops when going off-boundaries', () => {
    const initialState = {
      length: 3,
      maxHorizontal: 10, maxVertical: 10
    };

    initialState.head = {
      x: 0, y: 9
    };
    let snake = new Snake(initialState);
    snake.move('up');
    expect(snake.getSegments()).toEqual(
      [{x: 0, y: 8}, {x: 0, y: 9}, {x: 0, y: 0}]
    );

    snake = new Snake(initialState);
    snake.move('left');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 0, y: 8}, {x: 0, y: 9}, {x: 9, y: 9}]
    );

    initialState.head = {
      x: 9, y: 0
    };
    snake = new Snake(initialState);
    snake.move('left');
    snake.move('down');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 9, y: 0}, {x: 8, y: 0}, {x: 8, y: 9}]
    );

    snake = new Snake(initialState);
    snake.move('right');
    expect(snake.getLength()).toEqual(initialState.length);
    expect(snake.getSegments()).toEqual(
      [{x: 9, y: 9}, {x: 9, y: 0}, {x: 0, y: 0}]
    );
  });

  it('grows when eats food', () => {
    const initialState = {
      length: 1,
      maxHorizontal: 10, maxVertical: 10
    };

    initialState.head = {
      x: 0, y: 0
    };

    const fieldMock = {
      eatFood: () => {},
      hasFood: () => {},
    };
    spyOn(fieldMock, 'hasFood').and.returnValue(true);
    spyOn(fieldMock, 'eatFood');
    let snake = new Snake(initialState);
    snake.setField(fieldMock);
    snake.move('up');
    
    expect(fieldMock.hasFood).toHaveBeenCalledWith(0, 1);
    expect(fieldMock.eatFood).toHaveBeenCalledTimes(1);
    expect(snake.getLength()).toEqual(2);
    expect(snake.getSegments()[0]).toEqual({x: 0, y: 0});
  });

  it('snake dies when it hits itself', () => {
    const initialState = {
      length: 5,
    };
    const snake = new Snake(initialState);
    snake.move('left');
    expect(snake.isAlive()).toBeTrue();
    snake.move('down');
    expect(snake.isAlive()).toBeTrue();
    snake.move('right');
    expect(snake.isAlive()).toBeFalse();
  });

});