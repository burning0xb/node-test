// 配置路由
export default function getRoutes(store) {
  const requireLogin = (nextState, replaceState, cb) => {
    const { application: { user } } = store.getState();
    if (!user && nextState !== undefined) {
      // oops, not logged in, so can't be here!
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    } else if (nextState.routes[nextState.routes.length - 1].authorities) {
      if (user.authorities.length < 1) {
        replaceState({ nextPathname: nextState.location.pathname }, '/');
      } else {
        let passFlag = false;
        for (let index = 0; index < user.authorities.length; index++) {
          if (user.authorities[index].authority === nextState.routes[nextState.routes.length - 1].authorities) {
            passFlag = true;
            break;
          }
        }
        if (!passFlag) {
          // oops, not logged in, so can't be here!
          replaceState({ nextPathname: nextState.location.pathname }, '/');
        }
      }
    }
    cb();
  };

  // Polyfill
  if (typeof require.ensure !== 'function') {
    require.ensure = function polyfill(dependency, callback) { callback(require); };
  }

  const rootRoute = {
    childRoutes: [
      {
        path: '/',
        component: require('./containers/App'),
        indexRoute: {
          name: '首页',
          onEnter: requireLogin,
          component: require('./containers/Home')
        },
        childRoutes: [
          {
            path: 'ma',
            component: require('./containers/Management'),
            indexRoute: {
              name: '首页',
              onEnter: requireLogin,
              component: require('./containers/Home')
            },
            childRoutes: [
              {
                path: 'roleAdd',
                authorities: 'roleManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/role').RoleAdd);
                  }, 'roleadd');
                }
              },
              {
                path: 'logManagement',
                authorities: 'logManagement',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/system').LogManagement);
                  }, 'LogManagement');
                }
              },
              {
                path: 'WechatUser',
                authorities: 'wechatManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/com').WechatUserSearch);
                  }, 'WechatUserSearch');
                }
              },
              {
                path: 'UserDetail/:usrNo',
                authorities: 'wechatManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/com').WechatUserDetail);
                  }, 'WechatUserDetail');
                }
              },
              {
                path: 'roleEdit',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/role').RoleEdit);
                  }, 'roleedit');
                }
              }, {
                path: 'searchTrade',
                authorities: 'tradeSearch',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/bail').SearchTrade);
                  }, 'SearchTrade');
                },
              }, {
                path: 'searchBaill',
                authorities: 'billCount',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/bail').SearchBaill);
                  }, 'SearchBaill');
                },
              }, {
                path: 'searchChk',
                authorities: 'billChk',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/bail').SearchChk);
                  }, 'SearchChk');
                },
              }, {
                path: 'product',
                component: require('./containers/product').Product,
                indexRoute: {
                  name: '首页',
                  authorities: 'userManage',
                  onEnter: requireLogin,
                  component: require('./containers/product').ProductList
                },
                childRoutes: [
                  {
                    path: 'productAdd',
                    authorities: 'userManage',
                    onEnter: requireLogin,
                    getComponent: (nextState, cb) => {
                      require.ensure([], () => {
                        cb(null, require('./containers/product').ProductAdd);
                      }, 'ProductAdd');
                    },
                    // onEnter: requireLogin
                  }, {
                    path: 'roleedit/:userid',
                    authorities: 'userManage',
                    onEnter: requireLogin,
                    getComponent: (nextState, cb) => {
                      require.ensure([], () => {
                        cb(null, require('./containers/product').UserAuth);
                      }, 'UserAuth');
                    },
                    // onEnter: requireLogin
                  }, {
                    path: 'productEdit/:productId',
                    authorities: 'userManage',
                    onEnter: requireLogin,
                    getComponent: (nextState, cb) => {
                      require.ensure([], () => {
                        cb(null, require('./containers/product').ProductEdit);
                      }, 'ProductEdit');
                    },
                    // onEnter: requireLogin
                  }, {
                    path: 'productView/:productId',
                    authorities: 'userManage',
                    onEnter: requireLogin,
                    getComponent: (nextState, cb) => {
                      require.ensure([], () => {
                        cb(null, require('./containers/product').ProductView);
                      }, 'ProductView');
                    },
                  }
                ]
              },
              {
                path: 'MaterialManage',
                authorities: 'materialManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/material').MaterialManage);
                  }, 'MaterialManage');
                }
              },
              {
                path: 'MsgManage',
                authorities: 'messManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/material').MsgManage);
                  }, 'MsgManage');
                }
              },
              {
                path: 'addMaterial',
                authorities: 'materialManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/material').AddMaterial);
                  }, 'AddMaterial');
                }
              },
              {
                path: 'materialDetail/:materialNo',
                authorities: 'materialManage',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/material').MaterialDetail);
                  }, 'MaterialDetail');
                }
              },
              {
                path: 'BonusTrack',
                authorities: 'awardTrace',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/exhibit').BonusTrack);
                  }, 'BonusTrack');
                }
              },
              {
                path: 'BonusQuery',
                authorities: 'awardSearch',
                onEnter: requireLogin,
                getComponent: (nextState, cb) => {
                  require.ensure([], () => {
                    cb(null, require('./containers/ma/exhibit').BonusQuery);
                  }, 'BonusQuery');
                }
              }
            ]
          },
          {
            path: 'regist',
            getComponent: (nextState, cb) => {
              require.ensure([], () => {
                cb(null, require('./containers/Security').Register);
              }, 'Register');
            }
          },
          {
            path: 'login',
            getComponent: (nextState, cb) => {
              require.ensure([], () => {
                cb(null, require('./containers/Security').Login);
              }, 'Login');
            }
          }
        ]},
    ]
  };
  return rootRoute;
}
