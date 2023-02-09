function Stats(drawer, config = {}) {
  const TEXT_SIZE = 20;
  const TEXT_COLOUR = [0, 0, 0];
  const PANEL_HEIGHT = 100;

  let score = 0;
  const panelPadding = config.size ?? 500;

  this.setScore = (inputScore) => {
    score = inputScore;
  };

  this.draw = () => {
    drawer.fill(...TEXT_COLOUR);
    drawer.textSize(TEXT_SIZE);
    drawer.text(`Score: ${score}`, 20, panelPadding + 20);
  };

  this.getPanelHeight = () => {
    return PANEL_HEIGHT;
  };
}

module.exports = Stats;