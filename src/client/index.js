import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';

import configureStore from './data/configureStore';
import routes from './routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);
