const server = require('./app');
const socketio = require('socket.io');
// const increment = require('./serverReducer/number').incrementNumber;
const move = require('./serverReducer/gameBoard').move;
const addPlayer = require('./serverReducer/players').addPlayer;
const changeName = require('./serverReducer/players').changeName;
const removePlayer = require('./serverReducer/players').removePlayer;
const io = socketio(server);
const serverStore = require('./serverStore');

// const sendNumberStateTo = (userSocket) => {
//   const currentNumber = serverStore.getState().number;
//   if (userSocket) { userSocket.emit('updateNumber', currentNumber); }
//   else { io.emit('updateNumber', currentNumber); }
// };

const sendBoardStateTo = (userSocket) => {
  const sharedBoard = serverStore.getState().gameBoard.grid; // { row1 : {col1, col2}... }
  if (userSocket) { userSocket.emit('updateBoard', sharedBoard); }
  else { io.emit('updateBoard', sharedBoard); }
};

const sendPlayerListTo = (userSocket) => {
  userSocket.emit('setPlayers', serverStore.getState().players);
};

io.on('connection', (userSocket) => {
  // things to do when user connects
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

    io.emit('setPlayers', serverStore.getState().players);
  });

  userSocket.on('command', (command) => {
    serverStore.dispatch(move(command)); // e.g. { type: 'LEFT' }
  });

  userSocket.on('disconnect', () => {
    console.log(userSocket.id, 'disconnected');
    if (serverStore.getState().players.names[userSocket.id]) {
      serverStore.dispatch(removePlayer(userSocket.id));
      io.emit('setPlayers', serverStore.getState().players);
    }
  });

});

// SYNCS ALL CLIENTS ON AN INTERVAL
// setInterval(sendNumberStateTo, 5000);
setInterval(sendBoardStateTo, 1000);

module.exports = server;
