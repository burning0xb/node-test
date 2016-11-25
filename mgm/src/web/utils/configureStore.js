import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { reduxReactRouter, routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import * as reducers from 'redux/modules';
import apiRequestMiddleware from 'redux/middleware/apiRequestMiddleware';
import rpcMiddleware from 'redux/middleware/rpcMiddleware';
import Rpc from './Rpc';

// import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const combinedReducer = combineReducers({
  // router: routerStateReducer,
  form: formReducer,
  routing: routerReducer,
  reduxAsyncConnect,
  ...reducers
});

export default function configureStore(history, initialState) {
  const rpc = new Rpc();
  const apiRequest = apiRequestMiddleware(rpc);
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [thunk, rpcMiddleware, apiRequest, reduxRouterMiddleware];
  let store;

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('web/utils/DevTools/DevTools');
    store = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)(combinedReducer, initialState);
  } else {
    store = applyMiddleware(...middleware)(createStore)(combinedReducer, initialState);
  }
  Rpc.dispatch = store.dispatch;
  return store;
}
