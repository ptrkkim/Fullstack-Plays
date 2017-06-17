import BOOTSTRAP from 'bootstrap/dist/css/bootstrap.css';
import HEYLISTEN from './clientSocket';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import { Main } from './components';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
