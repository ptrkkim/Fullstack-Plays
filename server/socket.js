const server = require('./app');
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', (userSocket) => {
  console.log('a user connected');
});

module.exports = server;
