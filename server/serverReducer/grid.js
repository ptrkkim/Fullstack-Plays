// ACTIONS BELOW \\

const directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const { UP, DOWN, LEFT, RIGHT } = directions;

// ACTION CREATORS BELOW \\

// direction formerly command, may switch back or separate more advanced
// commands to another reducer
const move = (direction) => ({ type: directions[direction] });
// let's just test with a number we can increment up or down?
const gridSize = 3;
const gridStructure = Array(gridSize).fill(null).map((el, ind) => ind);
const defaultGrid = {};

gridStructure.forEach(index => {
  const rowInd = `row${index}`;
  defaultGrid[rowInd] = {};
  gridStructure.forEach(ind => {
    const colInd = `col${ind}`;
    defaultGrid[rowInd][colInd] = 'blank';
  });
});

defaultGrid.row1.col1 = 'player';
defaultGrid.playerPos = { row: 1, col: 1 };
// const gridLooksLike = {
//   row1: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   row2: {col1: 'blank', col2: 'blank', col3: 'blank'},
///  row3: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   playerPos: { row: 1, col: 1 }
// };


//REDUCER BELOW \\
// eventually, i can handle validity of grid movements in switch cases
// full grid can be obtained and sent to new players via serverStore.getState();

const gridReducer = (state = defaultGrid, action) => {

  switch (action.type) {
    case LEFT: {
      return moveLeftAndRight(state, 'left');
    }
    case RIGHT: {
      return moveLeftAndRight(state, 'right');
    }
    case UP: {
      return moveUpAndDown(state, 'up');
    }
    case DOWN: {
      return moveUpAndDown(state, 'down');
    }
    default:
      return state;
  }
};

function moveUpAndDown(state, upOrDown) {
  const { oldPlayerPos, oldPlayerRowInd, oldPlayerColInd } = getOldPositionInfo(state);
  const atEdge = (upOrDown === 'up')
    ? oldPlayerPos.row === 0
    : oldPlayerPos.row === (gridSize - 1);

  if (atEdge) return state;

  const newRowVal = (upOrDown === 'up')
    ? oldPlayerPos.row - 1
    : oldPlayerPos.row + 1;

  const newPos = Object.assign({}, oldPlayerPos, { row: newRowVal });
  const newRowInd = `row${newPos.row}`;
  const updatedRows  = {
    [newRowInd]: Object.assign(state[newRowInd], { [oldPlayerColInd]: 'player' }),
    [oldPlayerRowInd]: Object.assign(state[oldPlayerRowInd], { [oldPlayerColInd]: 'blank' })
  };

  return Object.assign(
    state,
    {playerPos: newPos},
    updatedRows
  );
}

function moveLeftAndRight (state, leftOrRight) {
  const { oldPlayerPos, oldPlayerRowInd, oldPlayerColInd } = getOldPositionInfo(state);
  const atEdge = (leftOrRight === 'left')
    ? oldPlayerPos.col === 0
    : oldPlayerPos.col === (gridSize - 1);

  if (atEdge) return state;

  const newColVal = (leftOrRight === 'left')
    ? oldPlayerPos.col - 1
    : oldPlayerPos.col + 1;

  const newPos         = Object.assign({}, oldPlayerPos, { col: newColVal }); // moves player if not at edge
  const newColInd   = `col${newPos.col}`;
  const updatedColumns = {[newColInd]: 'player', [oldPlayerColInd]: 'blank'};

  return Object.assign(
    state,
    {playerPos: newPos},
    {[oldPlayerRowInd]: Object.assign(state[oldPlayerRowInd], updatedColumns)}
  );
}

function getOldPositionInfo (state) {
  const oldPlayerPos = state.playerPos;
  const oldPlayerRowInd = `row${oldPlayerPos.row}`;
  const oldPlayerColInd = `col${oldPlayerPos.col}`;
  return { oldPlayerPos, oldPlayerRowInd, oldPlayerColInd };
}
// const updatedRow = Object.assign(state[oldPlayerRow], {col1: 'player', col2: 'blank'})
// lets say client emits 'command',

module.exports = {
  move,
  gridReducer
};
