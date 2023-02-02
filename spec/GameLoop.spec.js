const GameLoop = require('../src/GameLoop');

const DEFAULT_GAME_SPEED = 10;
const DEFAULT_GAME_SIZE = 500;
const DEFAULT_DIRECTION = 'right';

describe('GameLoop class tests', () => {
  describe('setup function', () => {
    it(`creates ${DEFAULT_GAME_SIZE}px square canvas when size is not specified`, () => {
      const config = {};
      const p5Closure = createP5Mock();
      spyOn(p5Closure, 'createCanvas');

      const game = new GameLoop(config);
      game.setDrawer(p5Closure);
      game.setup();

      expect(p5Closure.createCanvas).toHaveBeenCalledWith(DEFAULT_GAME_SIZE, DEFAULT_GAME_SIZE);
    });

    it('creates square canvas with specified size', () => {
      const config = {
        size: 300
      };
      const p5Closure = createP5Mock();
      spyOn(p5Closure, 'createCanvas');

      const game = new GameLoop(config);
      game.setDrawer(p5Closure);
      game.setup();

      expect(p5Closure.createCanvas).toHaveBeenCalledWith(config.size, config.size);
    });

    it('sets snake and field to each other after having set up both', () => {
      const fieldMock = {
        setSnake: () => {},
      };
      spyOn(fieldMock, 'setSnake');

      const snakeMock = {
        setField: () => {},
      };
      spyOn(snakeMock, 'setField');

      const game = new GameLoop({});
      game.setField(fieldMock);
      game.setSnake(snakeMock);

      expect(fieldMock.setSnake).toHaveBeenCalledWith(snakeMock);
      expect(snakeMock.setField).toHaveBeenCalledWith(fieldMock);
    });

    it(`sets ${DEFAULT_GAME_SPEED} as update rate when speed is not specified`, () => {
      const config = {};
      const p5Closure = createP5Mock();
      spyOn(p5Closure, 'frameRate');

      const game = new GameLoop(config);
      game.setDrawer(p5Closure);
      game.setup();

      expect(p5Closure.frameRate).toHaveBeenCalledWith(DEFAULT_GAME_SPEED);
    });

    it('sets update rate with specified speed', () => {
      const config = {
        speed: 199
      };
      const p5Closure = createP5Mock();
      spyOn(p5Closure, 'frameRate');

      const game = new GameLoop(config);
      game.setDrawer(p5Closure);
      game.setup();

      expect(p5Closure.frameRate).toHaveBeenCalledWith(config.speed);
    });
  });
  
  describe('directions functions', () => {
    it(`starts on the default direction: ${DEFAULT_DIRECTION}`, () => {
      const game = new GameLoop({});

      expect(game.getDirection()).toBe(DEFAULT_DIRECTION);
    });

    ['up', 'right', 'down', 'left'].forEach((direction) => {
      it(`sets direction: ${direction}`, () => {
        const game = new GameLoop({});
        game.setDirection(direction);

        expect(game.getDirection()).toBe(direction);
      });
    });
  });

  describe('update function', () => {
    it('draws field', () => {
      const game = new GameLoop({});
      const fieldMock = {
        draw: () => {},
      };
      spyOn(fieldMock, 'draw');
      game.setField(fieldMock);

      game.update();
      expect(fieldMock.draw).toHaveBeenCalledTimes(1);
    });

    it('moves snake if snake is alive', () => {
      const game = new GameLoop({});
      const snakeMock = {
        isAlive: () => {},
        move: () => {},
      };
      spyOn(snakeMock, 'move');
      spyOn(snakeMock, 'isAlive').and.returnValue(true);
      game.setSnake(snakeMock);

      game.update();
      expect(snakeMock.move).toHaveBeenCalledTimes(1);
    });

    it('shows GAME OVER screen if snake is dead', () => {
      const game = new GameLoop({});
      const screens = {
        showGameOver: () => {},
      };
      spyOn(screens, 'showGameOver')
      
      const snakeMock = {
        isAlive: () => {},
      };
      spyOn(snakeMock, 'isAlive').and.returnValue(false);
      
      game.setSnake(snakeMock);
      game.setScreens(screens);

      game.update();
      expect(screens.showGameOver).toHaveBeenCalledTimes(1);
    });
  });
});

function createP5Mock() {
  return {
    createCanvas: () => {},
    frameRate: () => {},
  };
}