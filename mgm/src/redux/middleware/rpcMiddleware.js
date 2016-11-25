// 返回promise，页面等待promise处理完后再渲染
import config from 'config';

export default function rpcMiddleware() {
  return (next) => (action) => {
    if (!action) {
      return next(action);
    }
    const { rpcUrl, options, SUCC_TYPE, FAIL_TYPE, ...rest } = action;
    if (!rpcUrl) {
      return next(action);
    }

    let url;
    if (__CLIENT__) {
      url = config.servicePath + rpcUrl;
    } else {
      url = 'http://' + config.serviceHost + ':' + config.servicePort + config.servicePath + rpcUrl;
    }

    let fOptions = options;
    if (!fOptions) {
      fOptions = {};
    }
    fOptions.credentials = 'same-origin';

    return fetch(url, fOptions).then(
      (fetchRes) => {return fetchRes.json();}
    ).then(
      (response) => next({ ...rest, response, type: SUCC_TYPE }),
      (error) => next({ ...rest, error, type: FAIL_TYPE })
    );
  };
}

/* action creator的样例：
export function getRole() {
  return {
    rpcUrl: '/profile/getRole', 调用后端的服务地址
    options: xxx fetch的附件选项
    SUCC_TYPE: GETROLESUCCESS, 调用成功后的action type
    FAIL_TYPE: GETROLESUCCESS 调用失败后的action type
  };
}
*/
