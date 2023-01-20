const p5 = require('p5');
const Field = require('../src/Field');

new p5(function(closure) {
  const snakeField = new Field(closure, {width: 100, height: 100});
  closure.setup = () => {
    closure.createCanvas(1000, 1000);
  }
  closure.draw = snakeField.draw;
}, document.getElementById('main-canvas'));