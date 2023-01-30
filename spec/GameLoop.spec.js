const GameLoop = require('../src/GameLoop');

const DEFAULT_GAME_SPEED = 10;
const DEFAULT_GAME_SIZE = 500;

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
    ['up', 'right', 'down', 'left'].forEach((direction) => {
      it(`sets direction: ${direction}`, () => {
        const game = new GameLoop({});
        game.setDirection(direction);

        expect(game.getDirection()).toBe(direction);
      });
    });

  });

  describe('update function', () => {
    it('sets update rate with specified speed', () => {

    });
  });
});

function createP5Mock() {
  return {
    createCanvas: () => {},
    frameRate: () => {},
  };
}