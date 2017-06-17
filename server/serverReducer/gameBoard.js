// ACTIONS BELOW \\

const directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const { UP, DOWN, LEFT, RIGHT } = directions;

// ACTION CREATORS BELOW \\

const move = (direction) => ({ type: directions[direction] });

//REDUCER BELOW \\

const gridSize = 3;
const gridStructure = Array(gridSize).fill(null).map((el, ind) => ind);
const defaultBoard = {
  playerPos: { row: 1, col: 1},
  size: gridSize,
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

defaultBoard.grid.row1.col1 = 'player';
// const gridLooksLike = {
//   row1: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   row2: {col1: 'blank', col2: 'blank', col3: 'blank'},
///  row3: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   playerPos: { row: 1, col: 1 }
// };

const boardReducer = (state = defaultBoard, action) => {
  const { playerPos, grid } = state;
  switch (action.type) {
    case LEFT: {
      // will intentionally not returning entirely new state trigger selective rerender
      // if nested objects become entirely new objects?
      // moveLeftAndRight returns {playerPos, grid}
      return Object.assign(state, moveLeftAndRight(grid, playerPos, 'left'));
    }
    case RIGHT: {
      return Object.assign(state, moveLeftAndRight(grid, playerPos, 'right'));
    }
    case UP: {
      return Object.assign(state, moveUpAndDown(grid, playerPos, 'up'));
    }
    case DOWN: {
      return Object.assign(state, moveUpAndDown(grid, playerPos, 'down'));
    }
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

  // return Object.assign(
  //   oldGrid,
  //   {playerPos: newPos},
  //   updatedRows
  // );
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

  // return Object.assign(
  //   oldGrid,
  //   {playerPos: newPos},
  //   {[oldRowInd]: Object.assign(oldGrid[oldRowInd], updatedColumns)}
  // );
}

function getOldPositionInfo (playerPos) {
  const oldPlayerPos = playerPos;
  const oldRowInd = `row${oldPlayerPos.row}`;
  const oldColInd = `col${oldPlayerPos.col}`;
  return { oldPlayerPos, oldRowInd, oldColInd };
}

module.exports = {
  move,
  boardReducer
};
