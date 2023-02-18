function Screens(drawer) {
  const TEXT_SIZE = 70;
  const FILL_COLOUR = [0, 0, 0];
  
  this.showGameOver = () => {
    drawer.textSize(TEXT_SIZE);
    drawer.fill(...FILL_COLOUR);
    drawer.text('GAME OVER', 40, 240);
  };
}

module.exports = Screens;