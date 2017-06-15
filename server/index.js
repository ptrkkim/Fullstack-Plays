const app = require('./app');
const server = require('http').Server(app);
const PORT = 1337;

server.listen(PORT, () => {
  console.log(`slither slither on port ${PORT}`);
});

// server.on('request', app);

// const socketio = require('socket.io');
// const io = socketio(server);

