// ACTIONS BELOW \\
// const UPDATE_GRID = 'UPDATE_GRID';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
// ACTION CREATORS BELOW \\

const incrementNumber = () => ({type: INCREMENT });
const decrementNumber = () => ({type: DECREMENT});

// let's just test with a number we can increment up or down?
// const defaultGrid;
const defaultNumber = 0;

// REDUCER BELOW \\
// eventually, i can handle validity of grid movements in swith cases
const numberReducer = (state = defaultNumber, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};


// lets say client emits 'command',

module.exports = {
  incrementNumber,
  decrementNumber,
  numberReducer
};
