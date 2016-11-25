// import 'whatwg-fetch';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import AbstractRpc from '../../redux/utils/AbstractRpc';
import config from 'config';
import { push } from 'react-router-redux';

export default class Rpc extends AbstractRpc {

  handleRequest(url, options) {
    return {
      url: `${config.contextRoot}${config.servicePath}${url}`,
      options
    };
  }

  handleResponse(response) {
    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('RPC系统忙，请稍后尝试！');
      } else if (response.status === 500) {
        throw new Error('RPC系统内部错误，请联系管理员！');
      } else if (response.status === 404) {
        throw new Error('RPC请求资源不存在！');
      } else if (response.status === 401 || response.status === 403) {
        // 需要授权，此处不需要登出
        Rpc.dispatch(push('/login'));
      } else {
        throw new Error(`RPC请求失败：${response.status} (${response.statusText})`);
      }
    }
    return response;
  }
}
