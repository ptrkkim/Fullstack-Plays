const server = require('./app');
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', (userSocket) => {
  console.log(userSocket.id, 'a user connected');

  userSocket.broadcast.emit('receiveMsg', {
      sender: 'server',
      text: `${userSocket.id} has joined.`
    });

  userSocket.on('newMsg', (message) => {
    io.emit('receiveMsg', message);
  });

  userSocket.on('disconnect', () => {
    console.log(userSocket.id, 'disconnected');
  });

});

io.on('newMessage', (userSocket) => {
  io.emit('receiveMsg', {
    sender: 'server',
    text: `HELLO EVERYBODY I AM ${userSocket.id}`
  });
});

module.exports = server;
