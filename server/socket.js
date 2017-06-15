const server = require('./app');
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', (userSocket) => {
  console.log(userSocket.id, 'a user connected');

  userSocket.on('disconnect', () => {
    console.log(userSocket.id, 'disconnected');
  });

  userSocket.emit('receiveMsg', {
    sender: 'server',
    text: 'am I annoying you yet???'
  });
});

module.exports = server;
