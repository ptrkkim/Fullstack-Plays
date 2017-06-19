import { addMessage } from '../reducer/messages';
import store from '../store';
import io from 'socket.io-client';
import { newNumber } from '../reducer/number';
import { setBoard } from '../reducer/board';
import { setPlayers } from '../reducer/players';

// set up listeners for server signals
export const clientSocket = io(window.location.host /*, { reconnect: true } */);

(() => {
  clientSocket.on('connect', () => {
    console.log('You are connected to the server.');
  });

  clientSocket.on('receiveMsg', (message) => {
    store.dispatch(addMessage(message));
  });

  clientSocket.on('setPlayers', (players) => {
    store.dispatch(setPlayers(players));
  });

  // in test case, storeState is simply an integer
  clientSocket.on('updateNumber', (serverStoreState) => {
    store.dispatch(newNumber(serverStoreState));
  });

  clientSocket.on('updateBoard', (grid) => {
    store.dispatch(setBoard(grid));
  });
})();
