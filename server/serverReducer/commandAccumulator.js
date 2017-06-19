// ACTIONS BELOW \\
const ADD_COMMAND = 'ADD_COMMAND';
const CLEAR_COMMANDS = 'CLEAR_COMMANDS';

// ACTION CREATORS BELOW \\
const addCommand = command => ({type: ADD_COMMAND, command});
const clearCommands = () => ({type: CLEAR_COMMANDS});

// REDUCER BELOW \\
const defaultAccumulator = [];
const commandsReducer = (state = defaultAccumulator, action) => {
  switch (action.type) {
    case ADD_COMMAND:
      return [...state, action.command];
    case CLEAR_COMMANDS:
      return [];
    default:
      return state;
  }
};

module.exports = {
  addCommand,
  clearCommands,
  commandsReducer
};
