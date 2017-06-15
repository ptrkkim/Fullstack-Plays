const PORT = 3000;
const server = require('./socket');
// const socketio = require('socket.io');
// const io = socketio(server);

server.listen(PORT, () => {
  console.log(`slither slither on port ${PORT}`);
});
