import createReducer from 'redux/utils/createReducer';
import { LOGIN_SUCCESS, ERROR_SHOW, SUCCESS_SHOW } from './application';
import dataFormat from 'web/utils/DataFormat';

export const SUBMIT = 'REGISTER/SUBMIT';
export const ALLSUCCESS = 'REGISTER/ALLSUCCESS';
export const GETCODESUCCESS = 'REGISTER/GETCODESUCCESS';
export const SUBMIT_FAILURE = 'REGISTER/SUBMIT_FAILURE';
export const SUBMIT_SUCCESS_GETUSER = 'REGISTER/SUBMIT_SUCCESS_GETUSER';

const initialState = {
  result: '',
  error: 10000,
  msg: '',
  userInfo: {}
};

const actionHandlers = {
  [SUBMIT]: () => ({ allSuccess: undefined }),
  [ALLSUCCESS]: () => ({ allSuccess: 1 }),
  [GETCODESUCCESS]: (state, action) => ({ codeSuccess: action.mobile }),
  [ERROR_SHOW]: () => ({ codeSuccess: undefined, allSuccess: undefined }),
  [SUBMIT_SUCCESS_GETUSER]: (state, action) => ({ userInfo: action.response, status: undefined }),
  [SUBMIT_FAILURE]: (state, action) => ({ result: action.result, msg: 'failure', error: action.error }),
  [LOGIN_SUCCESS]: () => ({ userInfo: undefined })
};

export default createReducer(initialState, actionHandlers);

// 提示框
export function chkInfo(obj) {
  return {
    type: ERROR_SHOW,
    error: obj
  };
}

// 提示框
export function suInfo(obj) {
  return {
    type: SUCCESS_SHOW,
    success: obj
  };
}

export function failure(responses) {
  return dispatch => {
    dispatch({
      type: SUBMIT_FAILURE, responses
    });
  };
}

export function codeSuccess(response) {
  if (response.result === '0') {
    return {
      type: SUCCESS_SHOW,
      success: '验证码发送成功'
    };
  }
}

export function getSuccess(response) {
  return {
    type: SUBMIT_SUCCESS_GETUSER, response
  };
}

// export function designSuccess(responses) {
//   if (responses.status === 'success') {
//     return dispatch => {
//       dispatch({
//         type: SUBMIT,
//         apiRequest: (rpc) => rpc.jsonGet('/security/currentUserUpd'),
//         actions: {
//           success: (response) => getSuccess(response),
//           failure: (response) => failure(response)
//         }
//       });
//     };
//   }
// }

export function registerSuccess(response) {
  if (response.desc === 'success') {
    return dispatch => {
      dispatch({
        type: SUBMIT,
        apiRequest: (rpc) => rpc.jsonGet('/security/currentUserUpd'),
        actions: {
          success: (responses) => getSuccess(responses),
          failure: (responses) => failure(responses)
        }
      });
    };
  }
  if (response.desc === 'codeWrong') {
    return {
      type: ERROR_SHOW,
      error: '验证码错误'
    };
  }
  if (response.desc === 'userexisted') {
    return {
      type: ERROR_SHOW,
      error: '用户已存在'
    };
  }
  if (response.errMsg) {
    return {
      type: ERROR_SHOW,
      error: response.errMsg.BadRequest
    };
  }
}

export function mobileSuccess(response, tel, pwd, pwd2, code, tag) {
  if (response.desc === 'Y') {
    return {
      type: ERROR_SHOW,
      error: '用户手机号已注册'
    };
  }
  if (tag === 1) {
    const reg = new RegExp('[a-zA-Z0-9`~!@%#$^&\*\(\)\+\=\\\}\{.,;\"\'\/\-]');
    const checked = reg.test(pwd);
    if (pwd === '') {
      return {
        type: ERROR_SHOW,
        error: '请输入密码'
      };
    } else if (!checked || pwd.length < 6 || pwd.length > 16) {
      return {
        type: ERROR_SHOW,
        error: '登录密码必须是6-16个英文、数字或符号'
      };
    }
    if (pwd2 === '') {
      return {
        type: ERROR_SHOW,
        error: '请重复输入密码'
      };
    }
    if (pwd !== pwd2) {
      return {
        type: ERROR_SHOW,
        error: '两次输入的密码不一致'
      };
    }
    if (code === '') {
      return {
        type: ERROR_SHOW,
        error: '验证码不能为空'
      };
    }
    if (!/^\d+$/.test(code) || code.length !== 6) {
      return {
        type: ERROR_SHOW,
        error: '验证码必须为六位数字'
      };
    }
    return {
      type: ALLSUCCESS
    };
  }
  return {
    type: GETCODESUCCESS,
    mobile: tel
  };
}

// 返回不同的响应结果
export function nameSuccess(response, tel, pwd, pwd2, code, tag) {
  if (response.desc === 'Y') {
    return {
      type: ERROR_SHOW,
      error: '用户名已存在'
    };
  }
  if (response.errMsg) {
    return {
      type: ERROR_SHOW,
      error: response.errMsg
    };
  }
  if (tel === '') {
    return {
      type: ERROR_SHOW,
      error: '请输入手机号码'
    };
  }
  if (/^1(3[0-9]|4[57]|5[012356789]|7[0-9]|8[0-9]|9[8])[0-9]{8}$/.test(tel) === false) {
    return {
      type: ERROR_SHOW,
      error: '手机号格式错误'
    };
  }
  const data = {
    mobile: tel,
    loginId: ''
  };
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/acct/chkMobile', dataFormat(data)),
    actions: {
      success: (mobile) => mobileSuccess(mobile, tel, pwd, pwd2, code, tag),
      failure: (mobile) => failure(mobile)
    }
  };
}

export function submitFailure(response) {
  return dispatch => {
    dispatch({
      type: SUBMIT_FAILURE, response
    });
  };
}

// 自动登录
export function login(info, storage) {
  return dispatch => {
    if (storage) storage.put('application/user', JSON.stringify(info));
    dispatch({
      type: LOGIN_SUCCESS,
      user: info
    });
  };
}

// 注册
export function regist(list) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/acct/create', list),
    actions: {
      success: (response) => registerSuccess(response),
      failure: (response) => submitFailure(response)
    }
  };
}

// 获取验证码
export function verificationCode(code) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonGet('/smsSend/sendSMS?' + code),
    actions: {
      success: (response) => codeSuccess(response),
      failure: (response) => submitFailure(response)
    }
  };
}

export function validators(name, tel, pwd, pwd2, code, tag) {
  if (name === '') {
    return {
      type: ERROR_SHOW,
      error: '用户名不能为空'
    };
  }
  if (!(/^([a-zA-Z0-9]+)$/.test(name))) {
    return {
      type: ERROR_SHOW,
      error: '用户名不能包含中文等特殊字符'
    };
  }
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/acct/chkLoginId', 'loginId=' + name),
    actions: {
      success: (response) => nameSuccess(response, tel, pwd, pwd2, code, tag),
      failure: (response) => submitFailure(response)
    }
  };
}
