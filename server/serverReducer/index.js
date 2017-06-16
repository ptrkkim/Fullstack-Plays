// import { combineReducers } from 'redux';
const combineReducers = require('redux').combineReducers;
const grid = require('./grid').gridReducer;

// grid is actually currently an integer
module.exports = combineReducers({ grid });
