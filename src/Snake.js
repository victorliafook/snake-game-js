function Snake(config = {}) {
  const head = {...(config.head ?? {x: 5, y: 5})} 
  const { maxHorizontal, maxVertical } = config;
  let field = null;

  const snakeSegments = [];

  const initialLength = config.length ?? 3;
  let alive = true;

  const coordinateMap = new Map();

  this.getLength = () => {
    return snakeSegments.length;
  };

  this.getHead = () => {
    return { ...head };
  };

  this.isAlive = () => {
    return alive;
  };

  this.move = (direction) => {
    const movement = movements[direction];
    const newCoords = getParameterisedCoords(head.x + movement.x, head.y + movement.y);
    setHead(newCoords.x, newCoords.y);

    alive = this.isSnake(head.x, head.y) === false;
  
    updateCoordinates();
    updateSegments();

    return { ...head };
  };

  this.getSegments = () => {
    return snakeSegments;
  };

  this.isSnake = (x, y) => {
    if (coordinateMap.get(x) === undefined) {
      return false;
    }
    return coordinateMap.get(x).has(y);
  };

  this.setField = (inputField) => {
    field = inputField;
  };

  initialiseSnake(this);

  function hasFood(x, y) {
    if (field === null) return false;
    return field.hasFood(x, y);
  }

  function setHead(x, y) {
    head.x = x;
    head.y = y;
  }

  function updateCoordinates() {
    coordinateMap.set(head.x, coordinateMap.get(head.x) ?? new Set());
    coordinateMap.get(head.x).add(head.y);
  }

  function updateSegments() {
    snakeSegments.push({ ...head });

    if (hasFood(head.x, head.y)) {
      field.eatFood();
    } else {
      const tail = snakeSegments.shift();
      coordinateMap.get(tail.x).delete(tail.y);
    }
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
    for(let i = 1; i < initialLength; i++) {
      const coords = getParameterisedCoords(head.x, head.y - i);
      yCoords.add(coords.y);
      snakeSegments.unshift(coords);
    }

    coordinateMap.set(head.x, yCoords);
  };

  function getParameterisedCoords(x, y) {
    const coords = {x, y};
    if (x < 0) { 
      coords.x = maxHorizontal - 1;
    }

    if (y < 0) { 
      coords.y = maxVertical - 1;
    }

    if (x >= maxHorizontal) { 
      coords.x = 0;
    }

    if (y >= maxVertical) { 
      coords.y = 0;
    }

    return coords;
  }
}

module.exports = Snake;