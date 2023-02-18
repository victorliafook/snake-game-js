const Screens = require('../src/gameElements/Screens');

describe('Screens class tests', () => {
  it('can draw the game over screen', () => {
    const drawerMock = {
      'text': () => {},
      'textSize': () => {},
      'fill': () => {}
    };
    spyOn(drawerMock, 'text');
    spyOn(drawerMock, 'textSize');
    spyOn(drawerMock, 'fill');

    const screen = new Screens(drawerMock);
    screen.showGameOver();

    expect(drawerMock.textSize).toHaveBeenCalledWith(70);
    const expectedFillColour = [0, 0, 0];
    expect(drawerMock.fill).toHaveBeenCalledWith(...expectedFillColour);
    expect(drawerMock.text).toHaveBeenCalledWith('GAME OVER', 40, 240);
  });
});