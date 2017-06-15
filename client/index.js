import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import { Main } from './components';

import io from 'socket.io-client';

const socket = io.connect(window.location.host, { reconnect: true });
socket.on('connect', () => {
  console.log('socket connected');
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
