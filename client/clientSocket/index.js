import { addMessage } from '../reducer/messages';
import store from '../store';
import io from 'socket.io-client';
import { newNumber } from '../reducer/number';

// set up listeners for server signals
export const clientSocket = io(window.location.host /*, { reconnect: true } */);

(() => {
  clientSocket.on('connect', () => {
    console.log('You are connected to the server.');
  });

  clientSocket.on('receiveMsg', (message) => {
    store.dispatch(addMessage(message));
  });

  // in test case, storeState is simply an integer
  clientSocket.on('updateNumber', (serverStoreState) => {
    store.dispatch(newNumber(serverStoreState));
  });

  clientSocket.on('updateGrid', (grid) => {
    console.log(grid);
    // store.dispatch(updateGrid(grid));
  });
})();
