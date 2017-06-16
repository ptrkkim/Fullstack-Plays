const server = require('./app');
const socketio = require('socket.io');
const increment = require('./serverReducer/number').incrementNumber;
const move = require('./serverReducer/grid').move;
const io = socketio(server);
const serverStore = require('./serverStore');

const sendNumberStateTo = (userSocket) => {
  // grid is actually currently an integer
  const currentNumber = serverStore.getState().number;
  if (userSocket) { userSocket.emit('updateNumber', currentNumber); }
  else { io.emit('updateNumber', currentNumber); }
};

const sendGridStateTo = (userSocket) => {

  const sharedGrid = serverStore.getState().grid; // { row1 : {col1, col2}... }
  if (userSocket) { userSocket.emit('updateGrid', sharedGrid); }
  else { io.emit('updateGrid', sharedGrid); }
};

// things to do when user connects
io.on('connection', (userSocket) => {
  console.log(userSocket.id, 'a user connected');

  // will send current game state on load
  // FUTURE:
  // depending on how fast this is, may need to use lifecycle hook
  // componentDidMount or componentWillMount to request game state
  // upon clientside grid loading, emit 'request current state'
  // send back the current state, regardless of tick.
  sendNumberStateTo(userSocket);
  sendGridStateTo(userSocket);

  userSocket.broadcast.emit('receiveMsg', {
      sender: 'server',
      text: `${userSocket.id} has joined.`
    });


  userSocket.on('newMsg', (message) => {
    io.emit('receiveMsg', message);
  });

  // number + increment is just for testing
  userSocket.on('command', (command) => {
    serverStore.dispatch(move(command)); // e.g. { type: 'LEFT' }
    // serverStore.dispatch(increment());
    // commented code simply sends the command back to all
    // therefore upon a user sending 'up', all users receive two messages
    // const message = {
    //   sender: 'commander',
    //   text: `valid command: ${command}`
    // };

    // io.emit('receiveMsg', message);
  });

  userSocket.on('disconnect', () => {
    console.log(userSocket.id, 'disconnected');
  });

});


// SYNCS ALL CLIENTS ON AN INTERVAL
setInterval(sendNumberStateTo, 5000);
setInterval(sendGridStateTo, 3000);

module.exports = server;
