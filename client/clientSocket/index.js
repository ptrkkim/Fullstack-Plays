import { addMessage } from '../reducer/messages';
import store from '../store';
import io from 'socket.io-client';

const clientSocket = io(window.location.host, { reconnect: true });

(() => {
  clientSocket.on('connect', () => {
    console.log('socket connected');
    console.log('ANOTHER MESSAGE');
  });

  clientSocket.on('receiveMsg', (message) => {
    store.dispatch(addMessage(message));
  });
})();


// (function () {

//   var whiteboard = window.whiteboard;
//   var socket = window.io(window.location.origin);

//   socket.on('connect', function () {
//     console.log('Connected!');
//   });

//   socket.on('load', function (strokes) {

//     strokes.forEach(function (stroke) {
//       var start = stroke.start;
//       var end = stroke.end;
//       var color = stroke.color;
//       whiteboard.draw(start, end, color, false);
//     });

//   });

//   socket.on('draw', function (start, end, color) {
//     whiteboard.draw(start, end, color, false);
//   });

//   whiteboard.on('draw', function (start, end, color) {
//     socket.emit('draw', start, end, color);
//   });

// })();
