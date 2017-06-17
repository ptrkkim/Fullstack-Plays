const combineReducers = require('redux').combineReducers;
const number = require('./number').numberReducer;
const gameBoard = require('./gameBoard').boardReducer;

// number is actually currently an integer
module.exports = combineReducers({
  number,
  gameBoard
});
