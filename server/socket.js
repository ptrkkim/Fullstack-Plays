const server = require('./app');
const socketio = require('socket.io');
// const increment = require('./serverReducer/number').incrementNumber;
const move = require('./serverReducer/gameBoard').move;
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

// things to do when user connects
io.on('connection', (userSocket) => {
  console.log(userSocket.id, 'a user connected');

  // will send current game state on load
  // FUTURE:
  // depending on how fast this is, may need to use lifecycle hook
  // componentDidMount or componentWillMount to request game state
  // upon clientside gameBoard loading, emit 'request current state'
  // send back the current state, regardless of tick.

  // sendNumberStateTo(userSocket);
  sendBoardStateTo(userSocket);

  userSocket.broadcast.emit('receiveMsg', {
      sender: 'server',
      text: `${userSocket.id} has joined.`
    });

  userSocket.on('newMsg', (message) => {
    io.emit('receiveMsg', message);
  });

  userSocket.on('command', (command) => {
    serverStore.dispatch(move(command)); // e.g. { type: 'LEFT' }
    // serverStore.dispatch(increment());
  });

  userSocket.on('disconnect', () => {
    console.log(userSocket.id, 'disconnected');
  });

});

// SYNCS ALL CLIENTS ON AN INTERVAL
// setInterval(sendNumberStateTo, 5000);
setInterval(sendBoardStateTo, 1000);

module.exports = server;
