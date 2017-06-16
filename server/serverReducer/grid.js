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
// const gridLooksLike = {
//   row1: {col1: 'blank', col2: 'blank', col3: 'blank'},
//   row2: {col1: 'blank', col2: 'blank', col3: 'blank'},
///  row3: {col1: 'blank', col2: 'blank', col3: 'blank'}
// };


//REDUCER BELOW \\
// eventually, i can handle validity of grid movements in switch cases
const numberReducer =  (state = defaultGrid, action) => {
  switch (action.type) {
    case LEFT:
      return state + 1;
    case RIGHT:
      return state - 1;
    case UP:
    case DOWN:
    default:
      return state;
  }
};


// lets say client emits 'command',

module.exports = {
  move,
  numberReducer
};
