const combineReducers = require('redux').combineReducers;
const number = require('./number').numberReducer;

// number is actually currently an integer
module.exports = combineReducers({ number });
