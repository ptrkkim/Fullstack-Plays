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
// const defaultGrid;
const gridSize = Array(3).fill(null).map((el, ind) => ind);
const defaultGrid = {};

gridSize.forEach(index => {
  const rowInd = `row${index}`;
  defaultGrid[rowInd] = {};
  gridSize.forEach(ind => {
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
  const oldPlayerPos = state.playerPos;
  const oldPlayerRow = `row${oldPlayerPos.row}`;
  const oldPlayerCol = `col${oldPlayerPos.col}`;

  switch (action.type) {
    case LEFT: {
      const newPos = oldPlayerPos.col > 0
        ? Object.assign({}, oldPlayerPos, { col: oldPlayerPos.col - 1 }) // moves player left if not at edge
        : oldPlayerPos;
      if (newPos === oldPlayerPos) return state;

      // if we are not at an edge, continue to update;
      const newPlayerCol   = `col${newPos.col}`;
      const updatedColumns = {[newPlayerCol]: 'player', [oldPlayerCol]: 'blank'};
      // DO NOT WANT TO CREATE ENTIRELY NEW GRID. ONLY UPDATE CHANGED CELLS
      return Object.assign(
        state,
        {playerPos: newPos},
        {[oldPlayerRow]: Object.assign(state[oldPlayerRow], updatedColumns)}
        // e.g. { row1: { col1: 'player', col2: 'blank' } }
        // changes old player col to blank, new player col to player
      );
    }
    case RIGHT: {
      return state;
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

// const updatedRow = Object.assign(state[oldPlayerRow], {col1: 'player', col2: 'blank'})
// lets say client emits 'command',

module.exports = {
  move,
  gridReducer
};
