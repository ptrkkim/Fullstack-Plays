import { browserHistory } from 'react-router';

const SET_TEAM = 'SET_TEAM';

const defaultTeam = {};

const setTeam = team => ({type: SET_TEAM, team });

export default function (state = defaultTeam, action) {
  switch (action.type) {
    case SET_TEAM:
      return action.team;
    default:
      return state;
  }
}
