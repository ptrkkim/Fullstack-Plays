const SET_PLAYERS = 'SET_PLAYERS';

const defaultPlayers = {
  names: {},
  count: 0
};

export const setPlayers = ({ names, count }) => ({ type: SET_PLAYERS, names, count });

export default function (state = defaultPlayers, action) {
  switch (action.type) {
    case SET_PLAYERS:
      return Object.assign({}, state, {names: action.names, count: action.count});
    default:
      return state;
  }
}

