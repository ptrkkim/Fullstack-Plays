// ACTIONS BELOW \\
const SET_BOARD = 'SET_BOARD';

// ACTION CREATORS BELOW \\

export const setBoard = grid => ({type: SET_BOARD, grid});

// REDUCER BELOW \\
const gridSize = 3;
const gridStructure = Array(gridSize).fill(null).map((el, ind) => ind);
const defaultBoard = {
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

export default function (state = defaultBoard, action) {
  switch (action.type) {
    case SET_BOARD:
      return Object.assign({}, state, {grid: action.grid});
    default:
      return state;
  }
}

