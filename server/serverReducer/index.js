const combineReducers = require('redux').combineReducers;
const number = require('./number').numberReducer;
const gameBoard = require('./gameBoard').boardReducer;
const players = require('./players').playerReducer;
// number is actually currently an integer
module.exports = combineReducers({
  number,
  gameBoard,
  players
});
