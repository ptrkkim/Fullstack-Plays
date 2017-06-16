const combineReducers = require('redux').combineReducers;
const number = require('./number').numberReducer;
const grid = require('./grid').gridReducer;

// number is actually currently an integer
module.exports = combineReducers({ number, grid });
