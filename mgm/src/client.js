/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './web/routes';
import getMobileRoutes from './web/mobileRoutes';
import configureStore from './web/utils/configureStore';

// const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');

const store = configureStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

let routes;
if (window.isMobile) {
  routes = getMobileRoutes(store);
} else {
  routes = getRoutes(store);
}
const component = (
  <Router render={(props) => <ReduxAsyncConnect {...props}/>}
       history={history}>
    {routes}
  </Router>
);

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
match({routes, location}, () => {
  ReactDOM.render(
    <Provider store={store} key="provider">
      {component}
    </Provider>,
    dest
  );
});

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.log('attr:' + dest.firstChild.attributes);
    console.log('checksum:' + dest.firstChild.attributes['data-react-checksum']);

    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('web/utils/DevTools/DevTools');
  match({routes, location}, () => {
    ReactDOM.render(
      <Provider store={store} key="provider">
        <div>
          {component}
          <DevTools />
        </div>
      </Provider>,
      dest
    );
  });
}
