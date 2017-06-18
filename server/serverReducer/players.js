
// assumes name has already been validated client-side
// initially all names are valid
// after first name, all users now have the first name in their FE state
// should therefore be unable to select that name (chat disabled, warning)

// once validated, sends the picked name to server
// userSocket.on('pickName', (name) => {
//   serverStore.dispatch(pickName(userSocket.id, name));
//   // dispatch socket id, name
// });

const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const CHANGE_NAME = 'CHANGE_NAME';

const defaultPlayers = {
  names: {},
  count: 0
};

const addPlayer = (userSocket, name) => ({
  type: ADD_PLAYER,
  id: userSocket.id,
  name
});

const changeName = (userSocket, name) => ({
  type: CHANGE_NAME,
  id: userSocket.id,
  name
});

const removePlayer = (userSocket) => ({
  type: REMOVE_PLAYER,
  id: userSocket.id
});
// export const addPlayer = name => ({ type: ADD_PLAYER, name });
// export const removePlayer = name => ({ type: REMOVE_PLAYER, name });

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
