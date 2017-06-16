const createStore = require('redux').createStore;
const reducer = require('../serverReducer');

module.exports = createStore(reducer);
