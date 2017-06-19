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
  timeRemaining: 45
};

// REDUCER BELOW \\
const statusReducer = (state = defaultStatus, action) => {
  switch (action.type) {
    case START_GAME:
      return {inProgress: true, timeRemaining: action.seconds};
    case RESET:
      return {inProgress: false, timeRemaining: action.seconds};
    case DECREMENT:
      return Object.assign({}, state, {timeRemaining: state.timeRemaining - 1});
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
