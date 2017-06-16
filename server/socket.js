const server = require('./app');
const socketio = require('socket.io');
const increment = require('./serverReducer/number').incrementNumber;
const io = socketio(server);
const serverStore = require('./serverStore');

const sendState = () => {
  // grid is actually currently an integer
  const currentNumber = serverStore.getState().number;
  io.emit('updateNumber', currentNumber);
};
// things to do when user
io.on('connection', (userSocket) => {
  console.log(userSocket.id, 'a user connected');

  // will send current game state on load
  // FUTURE:
  // depending on how fast this is, may need to use lifecycle hook
  // componentDidMount or componentWillMount to request game state
  // upon clientside grid loading, emit 'request current state'
  // send back the current state, regardless of tick.
  sendState();

  userSocket.broadcast.emit('receiveMsg', {
      sender: 'server',
      text: `${userSocket.id} has joined.`
    });


  userSocket.on('newMsg', (message) => {
    io.emit('receiveMsg', message);
  });

  // just for testing
  userSocket.on('command', (command) => {
    serverStore.dispatch(increment());
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
setInterval(sendState, 1000);

// io.on('newMessage', (userSocket) => {
//   io.emit('receiveMsg', {
//     sender: 'server',
//     text: `HELLO EVERYBODY I AM ${userSocket.id}`
//   });
// });



module.exports = server;
