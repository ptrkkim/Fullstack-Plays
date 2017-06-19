const UPDATE_STATUS = 'UPDATE_STATUS';
const VICTORY = 'VICTORY';
const FAILURE = 'FAILURE';

const defaultStatus = {
  inProgress: false,
  timeRemaining: 0,
  victory: null
};

export const updateStatus = status => ({
  type: UPDATE_STATUS,
  timeRemaining: status.timeRemaining,
  inProgress: status.inProgress
});
export const victory = () => ({type: VICTORY});
export const failure = () => ({type: FAILURE});

export default function (state = defaultStatus, action) {
  switch (action.type) {
    case UPDATE_STATUS:
      return Object.assign({}, state, {
        victory: null,
        inProgress: action.inProgress,
        timeRemaining: action.timeRemaining
      });
    case VICTORY:
      return Object.assign({}, state, {inProgress: false, victory: 'victory'});
    case FAILURE:
      return Object.assign({}, state, {inProgress: false, victory: 'failure'});
    default:
      return state;
  }
}
