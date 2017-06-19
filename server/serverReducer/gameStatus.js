const SECONDS = 30;
// ACTIONS BELOW \\
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const START_GAME = 'START_GAME';

// ACTION CREATORS BELOW \\
const startGame = (seconds) => ({type: START_GAME, seconds});
const decrementTime = () => ({type: DECREMENT});
const stopAndResetGame = () => ({type: RESET});

const defaultStatus = {
  inProgress: false,
  timeRemaining: SECONDS
};

// REDUCER BELOW \\
const statusReducer = (state = defaultStatus, action) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {inProgress: true, timeRemaining: action.seconds});
    case RESET:
      return Object.assign({}, state, {inProgress: false, timeRemaining: SECONDS});
    case DECREMENT:
      return state.timeRemaining > 1
        ? Object.assign({}, state, {inProgress: true, timeRemaining: state.timeRemaining - 1})
        : Object.assign({}, state, {inProgress: false, timeRemaining: 0});
    default:
      return state;
  }
};

module.exports = {
  stopAndResetGame,
  decrementTime,
  statusReducer,
  startGame
};
