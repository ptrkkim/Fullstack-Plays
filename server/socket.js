const server = require('./app');
const socketio = require('socket.io');
// const increment = require('./serverReducer/number').incrementNumber;
const move = require('./serverReducer/gameBoard').move;
const addCommand = require('./serverReducer/commandAccumulator').addCommand;
const clearCommands = require('./serverReducer/commandAccumulator').clearCommands;
const addPlayer = require('./serverReducer/players').addPlayer;
const changeName = require('./serverReducer/players').changeName;
const removePlayer = require('./serverReducer/players').removePlayer;
const io = socketio(server);
const serverStore = require('./serverStore');


const sendBoardStateTo = (userSocket) => {
  const sharedBoard = serverStore.getState().gameBoard.grid;
  if (userSocket) { userSocket.emit('updateBoard', sharedBoard); }
  else { io.emit('updateBoard', sharedBoard); }
};

const createNameObject = names => {
  const nameArray = Object.keys(names).map(key => names[key]);
  return nameArray.reduce((nameObj, name) => {
    return Object.assign(nameObj, {[name]: 'taken'});
  }, {});
};

const sendPlayerListTo = userOrAll => {
  const { names, count } = serverStore.getState().players;
  const nameList = createNameObject(names);
  userOrAll.emit('setPlayers', {names: nameList, count });
};

io.on('connection', (userSocket) => {
  // when user connects...
  console.log(userSocket.id, 'a user connected');
  sendBoardStateTo(userSocket);
  sendPlayerListTo(userSocket);

  // listeners e.g. if user emits newMsg...
  userSocket.on('newMsg', (message) => {
    io.emit('receiveMsg', message);
  });

  userSocket.on('pickName', (name) => {
    // if this socket id has no name
    if (!serverStore.getState().players.names[userSocket.id]) {
      serverStore.dispatch(addPlayer(userSocket.id, name));
    }
    else { serverStore.dispatch(changeName(userSocket.id, name)); }
    sendPlayerListTo(io);
  });

  // accumulate commands
  userSocket.on('command', (command) => {
    serverStore.dispatch(addCommand(command));
  });

  userSocket.on('disconnect', () => {
    if (serverStore.getState().players.names[userSocket.id]) {
      serverStore.dispatch(removePlayer(userSocket.id));
      io.emit('setPlayers', serverStore.getState().players);
    }
  });

});

// on tie, defaults to first occurrence of any member of the tie
// e.g. ['up', 'down', 'down', 'left', 'left', 'up', 'right'] => 'up'
const findMostCommon = (commandArr) =>
  commandArr.reduce((mostCommon, current, ind, arr) => {
    const accCount = arr.filter(str => str === mostCommon).length;
    const currentCount = arr.filter(str => str === current).length;
    return accCount >= currentCount
      ? mostCommon
      : current;
  }, null);

const tickGameState = () => {
  const mostPopularCommand = findMostCommon(serverStore.getState().commands);
  serverStore.dispatch(clearCommands());
  serverStore.dispatch(move(mostPopularCommand));
  sendBoardStateTo(); // to all if no argument
};
// SYNCS ALL CLIENTS ON AN INTERVAL
setInterval(tickGameState, 995);

module.exports = server;
