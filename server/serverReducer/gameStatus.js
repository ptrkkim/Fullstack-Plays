// ACTIONS BELOW \\
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// ACTION CREATORS BELOW \\
const decrementTime = () => ({type: DECREMENT});
const stopAndResetGame = () => ({type: RESET});

const defaultStatus = {
  inProgress: false,
  timeRemaining: 45
};

// REDUCER BELOW \\
const statusReducer = (state = defaultStatus, action) => {
  switch (action.type) {
    case RESET:
      return {inProgress: false, timeRemaining: 45};
    case DECREMENT:
      return Object.assign({}, state, {timeRemaining: state.timeRemaining - 1});
    default:
      return state;
  }
};

module.exports = {
  stopAndResetGame,
  decrementTime,
  statusReducer
};
