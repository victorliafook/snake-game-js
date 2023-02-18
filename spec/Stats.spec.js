const Stats = require('../src/gameElements/Stats');

const EXPECTED_PANEL_HEIGHT = 100;
const DEFAULT_PANEL_PADDING = 500;

describe('Stats class tests', () => {
  it('sets & shows score', () => {
    const drawerMock = {
      'text': () => {},
      'textSize': () => {},
      'fill': () => {}
    };
    spyOn(drawerMock, 'text');
    spyOn(drawerMock, 'textSize');
    spyOn(drawerMock, 'fill');

    const stats = new Stats(drawerMock);
    const score = Math.floor(Math.random() * 100);
    stats.setScore(score);
    stats.draw();

    const expectedFillColour = [0, 0, 0];
    expect(drawerMock.fill).toHaveBeenCalledOnceWith(...expectedFillColour);
    expect(drawerMock.textSize).toHaveBeenCalledOnceWith(20);
    expect(drawerMock.text).toHaveBeenCalledOnceWith(`Score: ${score}`, 20, DEFAULT_PANEL_PADDING + 20);
  });

  it('returns panel height', () => {
    const drawerMock = {};

    const stats = new Stats(drawerMock);
    expect(stats.getPanelHeight()).toEqual(EXPECTED_PANEL_HEIGHT);
  });
});