import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import state from './initialState';

export default (initialState = state) =>
  createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension() : f => f
    )
  );
