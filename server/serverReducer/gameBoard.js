// ACTIONS BELOW \\
const directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
const { UP, DOWN, LEFT, RIGHT } = directions;
const DO_NOTHING = 'DO_NOTHING';
const RESET = 'RESET';

// ACTION CREATORS BELOW \\
const move = direction => {
  return directions[direction]
    ? {type: directions[direction]}
    : {type: DO_NOTHING};
};

const resetBoard = () => {
  return {type: RESET};
};

//REDUCER BELOW \\
const gridSize = 7;
const gridStructure = Array(gridSize).fill(null).map((el, ind) => ind);
const startPos = { row: 3, col: 3 };
const defaultBoard = {
  playerPos: startPos,
  grid: {}
};

gridStructure.forEach(index => {
  const rowInd = `row${index}`;
  defaultBoard.grid[rowInd] = {};
  gridStructure.forEach(ind => {
    const colInd = `col${ind}`;
    defaultBoard.grid[rowInd][colInd] = 'blank';
  });
});

defaultBoard.grid[`row${startPos.row}`][`col${startPos.col}`] = 'player';

const seedBoard = () => {
  const seededBoard = {
    playerPos: startPos,
    grid: {}
  };

  gridStructure.forEach(index => {
    const rowInd = `row${index}`;
    seededBoard.grid[rowInd] = {};
    gridStructure.forEach(ind => {
      const colInd = `col${ind}`;
      seededBoard.grid[rowInd][colInd] = 'blank';
    });
  });

  seededBoard.grid[`row${startPos.row}`][`col${startPos.col}`] = 'player';
  // HARDCODE BECAUSE TIRED AND NEED TO GET A WORKING PRODUCT FAST

  seededBoard.grid[`row1`][`col5`] = 'js';
  seededBoard.grid[`row1`][`col0`] = 'react';
  seededBoard.grid[`row2`][`col2`] = 'node';
  seededBoard.grid[`row6`][`col3`] = 'css';
  seededBoard.grid[`row4`][`col4`] = 'data';
  seededBoard.grid[`row5`][`col1`] = 'redux';
  seededBoard.grid[`row6`][`col6`] = 'html';
  seededBoard.grid[`row0`][`col3`] = 'sql';
  return seededBoard;
};
// const gridLooksLike = {
//   row1: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   row2: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   row3: {col1: 'blank', col2: 'blank', col3: 'blank'},
// };

// actually don't return entirely new states in hopes of saving on perf?
// ease of reasoning remains the same in these cases- nothing is subscribed


const boardReducer = (state = defaultBoard, action) => {
  const { playerPos, grid } = state;
  switch (action.type) {
    case RESET:
      return seedBoard();
    case LEFT:
      return Object.assign(state, moveLeftAndRight(grid, playerPos, 'left'));
    case RIGHT:
      return Object.assign(state, moveLeftAndRight(grid, playerPos, 'right'));
    case UP:
      return Object.assign(state, moveUpAndDown(grid, playerPos, 'up'));
    case DOWN:
      return Object.assign(state, moveUpAndDown(grid, playerPos, 'down'));
    default:
      return state;
  }
};

function moveUpAndDown(oldGrid, playerPos, upOrDown) {
  const { oldPlayerPos, oldRowInd, oldColInd } = getOldPositionInfo(playerPos);
  const atEdge = (upOrDown === 'up')
    ? oldPlayerPos.row === 0
    : oldPlayerPos.row === (gridSize - 1);

  if (atEdge) return oldGrid;

  const newRowVal = (upOrDown === 'up')
    ? oldPlayerPos.row - 1
    : oldPlayerPos.row + 1;

  const newPos = Object.assign({}, oldPlayerPos, { row: newRowVal });
  const newRowInd = `row${newPos.row}`;
  const updatedRows  = {
    [newRowInd]: Object.assign(oldGrid[newRowInd], { [oldColInd]: 'player' }),
    [oldRowInd]: Object.assign(oldGrid[oldRowInd], { [oldColInd]: 'blank' })
  };

  return {
    playerPos: newPos,
    grid: Object.assign(oldGrid, updatedRows) // a full grid with two updated rows
  };
}

function moveLeftAndRight (oldGrid, playerPos, leftOrRight) {
  const { oldPlayerPos, oldRowInd, oldColInd } = getOldPositionInfo(playerPos);
  const atEdge = (leftOrRight === 'left')
    ? oldPlayerPos.col === 0
    : oldPlayerPos.col === (gridSize - 1);

  if (atEdge) return oldGrid;

  const newColVal = (leftOrRight === 'left')
    ? oldPlayerPos.col - 1
    : oldPlayerPos.col + 1;

  const newPos = Object.assign({}, oldPlayerPos, { col: newColVal }); // moves player if not at edge
  const newColInd = `col${newPos.col}`;
  const updatedColumns = {[newColInd]: 'player', [oldColInd]: 'blank'};
  const updatedRow = {
    [oldRowInd]: Object.assign(oldGrid[oldRowInd], updatedColumns)
  };

  return {
    playerPos: newPos,
    grid: Object.assign(oldGrid, updatedRow)
  };
}

function getOldPositionInfo (playerPos) {
  const oldPlayerPos = playerPos;
  const oldRowInd = `row${oldPlayerPos.row}`;
  const oldColInd = `col${oldPlayerPos.col}`;
  return { oldPlayerPos, oldRowInd, oldColInd };
}

module.exports = {
  move,
  resetBoard,
  boardReducer
};
