const PORT = 3000;
const server = require('./socket');
// const socketio = require('socket.io');
// const io = socketio(server);

server.listen(process.env.PORT || PORT, () => {
  console.log(`slither slither on port ${process.env.PORT || PORT}`);
});
