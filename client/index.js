require('bootstrap/dist/css/bootstrap.css');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import { Main } from './components';
import HEYLISTEN from './clientSocket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
