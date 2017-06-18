const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const CHANGE_NAME = 'CHANGE_NAME';

const defaultPlayers = {
  myName: '',
  names: {},
  count: 0
};

export const addPlayer = name => ({ type: ADD_PLAYER, name });
export const removePlayer = name => ({ type: REMOVE_PLAYER, name });
export const changeName = name => ({ type: CHANGE_NAME, name })

export default function (state = defaultPlayers, action) {
  switch (action.type) {
    case ADD_PLAYER: {
      const newNameList = Object.assign({}, state.names, {[action.name]: 'taken'});
      return Object.assign({}, state, { names: newNameList});
    }
    case REMOVE_PLAYER: {
      const newNameList = Object.assign({}, state.names, {[action.name]: null});
      return Object.assign({}, state, { names: newNameList});
    }
    default:
      return state;
  }
}

