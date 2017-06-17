// ACTIONS BELOW \\
const SET_BOARD = 'SET_BOARD';

// ACTION CREATORS BELOW \\

export const setBoard = grid => ({type: SET_BOARD, grid});

// REDUCER BELOW \\
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

export default function (state = defaultGrid, action) {
  switch (action.type) {
    case SET_BOARD:
      return action.grid;
    default:
      return state;
  }
}

