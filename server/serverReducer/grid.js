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
      const newGrid = moveLeftAndRight(state, 'left');
      return newGrid;
    }
    case RIGHT: {
      const newGrid = moveLeftAndRight(state, 'right');
      return newGrid;
    }
    case UP: {
      return state;
    }
    case DOWN: {
      return state;
    }
    default:
      return state;
  }
};


function moveLeftAndRight (state, leftOrRight) {
  const { oldPlayerPos, oldPlayerRow, oldPlayerCol } = getOldPositionInfo(state);
  const atEdge = (leftOrRight === 'left')
    ? oldPlayerPos.col > 0
    : oldPlayerPos.col < (gridSize - 1);

  const newColVal = (leftOrRight === 'left')
    ? oldPlayerPos.col - 1
    : oldPlayerPos.col + 1;

  const newPos = atEdge
    ? Object.assign({}, oldPlayerPos, { col: newColVal }) // moves player right if not at edge
    : oldPlayerPos;
  if (newPos === oldPlayerPos) return state;

  const newPlayerCol   = `col${newPos.col}`;
  const updatedColumns = {[newPlayerCol]: 'player', [oldPlayerCol]: 'blank'};

  return Object.assign(
    state,
    {playerPos: newPos},
    {[oldPlayerRow]: Object.assign(state[oldPlayerRow], updatedColumns)}
  );
}

function getOldPositionInfo (state) {
  const oldPlayerPos = state.playerPos;
  const oldPlayerRow = `row${oldPlayerPos.row}`;
  const oldPlayerCol = `col${oldPlayerPos.col}`;
  return { oldPlayerPos, oldPlayerRow, oldPlayerCol };
}
// const updatedRow = Object.assign(state[oldPlayerRow], {col1: 'player', col2: 'blank'})
// lets say client emits 'command',

module.exports = {
  move,
  gridReducer
};
