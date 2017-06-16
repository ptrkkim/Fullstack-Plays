// import { createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
// import reducer from '../reducer';

const createStore = require('redux').createStore;
const reducer = require('../serverReducer');

module.exports = createStore(reducer);
