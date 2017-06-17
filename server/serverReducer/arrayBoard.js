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
const grid = Array(gridSize).fill(null).map((row, ind) => {
  if (ind === 0) return ['player', ...Array(gridSize - 1).fill('blank')];
  return Array(gridSize).fill('blank');
});

const defaultBoard = {
  playerPos: { row: 1, col: 1},
  size: gridSize,
  grid
};
// const gridLooksLike = {
//   row1: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   row2: {col1: 'blank', col2: 'blank', col3: 'blank'},
///  row3: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   playerPos: { row: 1, col: 1 }
// };

// gridLooksLike = [
//  ['player', 'blank', 'blank'],
//  ['blank', 'blank', 'blank'],
//  ['blank', 'blank', 'blank']
// ]

const gridReducer = (state = defaultBoard, action) => {
  const oldGrid = state.grid;

  switch (action.type) {
    case LEFT: {
      const { newPos, newRow } = moveLeftAndRight(oldGrid, 'left');
      return Object.assign(state, { playerPos: newPos, grid: newGrid });
    }
    case RIGHT: {
      return Object.assign(state, {grid: moveLeftAndRight(oldGrid, 'right')});
    }
    case UP: {
      return Object.assign(state, {grid: moveUpAndDown(oldGrid, 'up')});
    }
    case DOWN: {
      return Object.assign(state, {grid: moveUpAndDown(oldGrid, 'down')});
    }
    default:
      return state;
  }
};

function moveUpAndDown(oldGrid, upOrDown) {
  const { oldPlayerPos, oldRowInd, oldColInd } = getOldPositionInfo(oldGrid);
  const atEdge = (upOrDown === 'up')
    ? oldPlayerPos.row === 0
    : oldPlayerPos.row === (gridSize - 1);

  if (atEdge) return oldGrid;

  const newRowVal = (upOrDown === 'up')
    ? oldPlayerPos.row - 1
    : oldPlayerPos.row + 1;

  const newPos = Object.assign({}, oldPlayerPos, { row: newRowVal });
  const newRowInd = newPos.row;
  const updatedRows  = {
    [newRowInd]: Object.assign(oldGrid[newRowInd], { [oldColInd]: 'player' }),
    [oldRowInd]: Object.assign(oldGrid[oldRowInd], { [oldColInd]: 'blank' })
  };


  // return Object.assign(
  //   state,
  //   {playerPos: newPos},
  //   updatedRows
  // );
}

function moveLeftAndRight (oldGrid, leftOrRight) {
  const { oldPlayerPos, oldRowInd, oldColInd } = getOldPositionInfo(oldGrid);
  const atEdge = (leftOrRight === 'left')
    ? oldPlayerPos.col === 0
    : oldPlayerPos.col === (gridSize - 1);

  if (atEdge) return oldGrid;

  const newColVal = (leftOrRight === 'left')
    ? oldPlayerPos.col - 1
    : oldPlayerPos.col + 1;

  const newPos         = Object.assign({}, oldPlayerPos, { col: newColVal }); // moves player if not at edge
  const newColInd   = `col${newPos.col}`;
  const updatedColumns = {[newColInd]: 'player', [oldColInd]: 'blank'};

  return Object.assign(
    state,
    {playerPos: newPos},
    {[oldRowInd]: Object.assign(state[oldRowInd], updatedColumns)}
  );
}

function getOldPositionInfo (state) {
  const oldPlayerPos = state.playerPos;
  const oldRowInd = oldPlayerPos.row;
  const oldColInd = oldPlayerPos.col;
  return { oldPlayerPos, oldRowInd, oldColInd };
}

module.exports = {
  move,
  gridReducer
};
