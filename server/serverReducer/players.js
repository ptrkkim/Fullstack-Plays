// assumes name has already been validated client-side
// initially all names are valid
// after first name, all users now have the first name in their FE state
// should therefore be unable to select that name (chat disabled, warning)

// ACTIONS \\
const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const CHANGE_NAME = 'CHANGE_NAME';

// ACTION CREATORS \\
const defaultPlayers = {
  names: {},
  count: 0
};

const addPlayer = (id, name) => ({
  type: ADD_PLAYER,
  id,
  name
});

const changeName = (id, name) => ({
  type: CHANGE_NAME,
  id,
  name
});

const removePlayer = (id) => ({ type: REMOVE_PLAYER, id });

// REDUCER \\
const playersReducer = (state = defaultPlayers, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      const newNames = Object.assign({}, state.names, { [action.id]: action.name });
      return Object.assign({}, state, {names: newNames, count: state.count + 1});
    }
    case CHANGE_NAME: {
      const newNames = Object.assign({}, state.names, { [action.id]: action.name });
      return Object.assign({}, state, {names: newNames});
    }
    case REMOVE_PLAYER: {
      const newNames = Object.assign({}, state.names, { [action.id]: null });
      return Object.assign({}, state, {names: newNames, count: state.count - 1});
    }
    default:
      return state;
  }
};

module.exports = {
  addPlayer,
  changeName,
  removePlayer,
  playersReducer
};
