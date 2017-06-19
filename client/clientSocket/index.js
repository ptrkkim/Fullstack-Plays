import { addMessage } from '../reducer/messages';
import store from '../store';
import io from 'socket.io-client';
import { updateStatus, victory, failure } from '../reducer/gameStatus';
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

  clientSocket.on('victory', () => {
    store.dispatch(victory());
  });

  clientSocket.on('failure', () => {
    store.dispatch(failure());
  });

  // in test case, storeState is simply an integer
  clientSocket.on('gameStatus', (serverGameStatus) => {
    store.dispatch(updateStatus(serverGameStatus));
  });

  clientSocket.on('updateBoard', (grid) => {
    store.dispatch(setBoard(grid));
  });
})();
