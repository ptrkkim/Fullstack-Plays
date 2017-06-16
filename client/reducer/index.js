import { combineReducers } from 'redux';
import number from './number';
import team from './team';
import messages from './messages';

export default combineReducers({ number, team, messages });
