import { addMessage } from '../reducer/messages';
import store from '../store';
import io from 'socket.io-client';

// set up listeners for server signals
export const clientSocket = io(window.location.host, { reconnect: true });

(() => {
  clientSocket.on('connect', () => {
    console.log('socket connected');
    console.log('ANOTHER MESSAGE');
  });

  clientSocket.on('receiveMsg', (message) => {
    store.dispatch(addMessage(message));
  });
})();
