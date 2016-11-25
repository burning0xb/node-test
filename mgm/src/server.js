import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import superagent from 'superagent';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './web/routes';
import getMobileRoutes from './web/mobileRoutes';
import * as actions from 'redux/modules/application';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

const remoteHost = config.serviceHost + ':' + config.servicePort;
const remoteContextRoot = config.servicePath;
import proxy from 'express-http-proxy';
import url from 'url';

import userAgent from 'express-useragent';
import configureStore from './web/utils/configureStore';
import multer from 'multer';

app.use(remoteContextRoot, proxy(remoteHost, {
  forwardPath: (req) => {
    console.log('remote:' + remoteHost + remoteContextRoot + url.parse(req.url).path);
    return remoteContextRoot + url.parse(req.url).path;
  }
}));

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(userAgent.express());

// cache
app.use(Express.static(path.join(__dirname, '..'), {
  etag: false,  // 考虑到负载均衡生成的etag不一致，只使用lastModified
  lastmodified: true
}));

// upload:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/demo/img/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single('file');

app.post('/upload', (req, res) => {
  console.log('upload:');
	// var upload = multer({ dest: './uploads', filename: originalname + }).single('image');
  // <-- programm always comes here
  upload(req, res, (err) => {
    // <-- programm very often doesnt come here
    if (err) {
      console.log(err);
    }
    // try to get fields and file infos
    // console.log("req file: " + req.file);
    // console.log("req body: " + req.body);
    res.header('Access-Control-Allow-Origin', '*');
    res.sendStatus(200);
  });
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createHistory(req.originalUrl);
  const store = configureStore();
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
    ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  let routes;
  if (req.useragent.isMobile) {
    routes = getMobileRoutes(store);
  } else {
    routes = getRoutes(store);
  }

  // 获取用户信息
  const clientCookie = req.get('cookie');
  let superReq = superagent.get('http://' + config.serviceHost + ':' +
                          config.servicePort + '/' + config.servicePath +
                          '/acct/getUserInfo');
  if (clientCookie) {
    superReq = superReq.set('cookie', req.get('cookie'));
  }
  superReq.end((err, response) => {
    let userInfo = JSON.parse(response.text).user;
    if (userInfo === '') {
      userInfo = undefined;
    }
    store.dispatch(actions.setUserInfo(userInfo));


    match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {
        // console.log('req cookie: ' + req.get('cookie'));
        loadOnServer({...renderProps, store}).then(() => {
          const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );

          res.status(200);

          global.navigator = {userAgent: req.headers['user-agent']};
          global.jQuery = require('jquery');
          res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html isMobile={req.useragent.isMobile}
              assets={webpackIsomorphicTools.assets()}
              component={component} store={store}/>));
          console.log('server send');
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
