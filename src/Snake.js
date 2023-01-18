function Snake(config = {}) {
  const head = {
    x: 5, y: 5
  };

  const snakeSegments = [];

  let length = config.length ?? 3;
  let alive = true;

  const coordinateMap = new Map();

  this.getLength = () => {
    return length;
  };

  this.getHead = () => {
    return { ...head };
  };

  this.isAlive = () => {
    return alive;
  };

  this.move = (direction) => {
    const movement = movements[direction];

    head.x += movement.x, head.y += movement.y;
    alive = didItHitItSelf() === false;
  
    updateCoordinates();
    updateSegments();

    return { ...head };
  };

  this.getSegments = () => {
    return snakeSegments;
  };

  initialiseSnake(this);

  function didItHitItSelf() {
    if (coordinateMap.get(head.x) === undefined) {
      return false;
    }
    return coordinateMap.get(head.x).has(head.y);
  }

  function updateCoordinates() {
    coordinateMap.set(head.x, coordinateMap.get(head.x) ?? new Set());
    coordinateMap.get(head.x).add(head.y);
  }

  function updateSegments() {
    snakeSegments.push({... head});
    const tail = snakeSegments.shift();

    //console.info(tail, coordinateMap)
    coordinateMap.get(tail.x).delete(tail.y);
  }

  const movements = {
    'up': { x: 0, y: 1 },
    'right': { x: 1, y: 0 },
    'down': { x: 0, y: -1 },
    'left': { x: -1, y: 0 },
  };

  function initialiseSnake(snake) {
    const yCoords = new Set();
    yCoords.add(head.y);
    snakeSegments.push({x: head.x, y:head.y});
    for(let i = 1; i < snake.getLength(); i++) {
      yCoords.add(head.y - i);
      snakeSegments.unshift({x: head.x, y: head.y - i});
    }

    coordinateMap.set(head.x, yCoords);
  };
}

module.exports = Snake;