import { combineReducers } from 'redux';
import number from './number';
import sender from './sender';
import messages from './messages';
import board from './board';

export default combineReducers({
  number,
  sender,
  messages,
  board
});
