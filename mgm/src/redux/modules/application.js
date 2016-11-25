import createReducer from '../utils/createReducer';

export const LOGIN = 'APPLICATION/LOGIN';
export const LOGIN_SUCCESS = 'APPLICATION/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'APPLICATION/LOGIN_FAILURE';
export const LOGOUT = 'APPLICATION/LOGOUT';
export const LOGOUT_SUCCESS = 'APPLICATION/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'APPLICATION/LOGOUT_FAILURE';
export const ERROR_SHOW = 'APPLICATION/ERROR_SHOW';
export const ERROR_CLOSE = 'APPLICATION/ERROR_CLOSE';
export const SUCCESS_SHOW = 'APPLICATION/SUCCESS_SHOW';
export const SUCCESS_CLOSE = 'APPLICATION/SUCCESS_CLOSE';
export const GET_IMG = 'APPLICATION/GET_IMG';
export const AUTO = 'APPLICATION/AUTO';
export const AUTO_SUCCESS = 'APPLICATION/AUTO_SUCCESS';
export const SAVE_OPENID = 'APPLICATION/SAVE_OPENID';
export const CHECK_BACK = 'APPLICATION/CHECK_BACK';
export const GO = 'APPLICATION/GO';
export const ALERTMSG_SHOW = 'APPLICATION/ALERTMSG_SHOW';
export const ALERTMSG_CLOSE = 'APPLICATION/ALERTMSG_CLOSE';
export const HASNEWMSG = 'APPLICATION/HASNEWMSG';
export const NEWMSG_SUCC = 'APPLICATION/NEWMSG_SUCC';
export const GETNEWACTIVITY = 'APPLICATION/GETNEWACTIVITY';
export const GETNEWSUCCESS = 'APPLICATION/GETNEWSUCCESS';

export const SET_USER_INFO = 'APPLICATION/SETUSERINFO';

const initialState = {
  loginStatus: undefined,
  logoutStatus: undefined,
  msg: undefined,
  error: undefined,
  user: undefined,
  success: undefined,
  alertMsg: undefined,
  autoFlag: undefined,
  newMsg: undefined,
  newActivity: undefined
};

const actionHandlers = {
  [LOGIN]: (action) => ({ loginStatus: 0, msg: 'login...', openId: action.openId, headImg: action.headImg, nickname: action.nickname }),
  [LOGIN_SUCCESS]: (state, action) => ({ loginStatus: 1, msg: 'login success', user: action.user }),
  [LOGIN_FAILURE]: (state, action) => ({ loginStatus: 2, error: action.msg }),
  [LOGOUT]: () => ({ logoutStatus: 0, msg: 'logout...' }),
  [LOGOUT_SUCCESS]: () => ({ loginStatus: undefined, logoutStatus: 1, msg: 'logout success', user: undefined }),
  [LOGOUT_FAILURE]: (state, action) => ({ loginStatus: undefined, logoutStatus: 2, error: action.msg, user: undefined }),
  [ERROR_SHOW]: (state, action) => ({ error: action.error }),
  [ERROR_CLOSE]: () => ({ error: undefined }),
  [SUCCESS_SHOW]: (state, action) => ({ success: action.success }),
  [SUCCESS_CLOSE]: () => ({ success: undefined }),
  [GET_IMG]: () => ({ getImgStatus: 0 }),
  [AUTO]: () => ({ autoFlag: 'no' }),
  [AUTO_SUCCESS]: (state, action) => ({ loginStatus: 1, msg: 'login success', user: action.user }),
  [SAVE_OPENID]: (state, action) => ({ openId: action.openId, headImg: action.headImg, nickname: action.nickname }),
  [ALERTMSG_SHOW]: (state, action) => ({ alertMsg: action.response }),
  [ALERTMSG_CLOSE]: () => ({ alertMsg: undefined }),
  [HASNEWMSG]: () => ({ }),
  [NEWMSG_SUCC]: (state, action) => ({ newMsg: action.res.newMsg }),
  [GETNEWSUCCESS]: (state, action) => ({ newActivity: action.response }),

  [SET_USER_INFO]: (state, action) => ({ user: action.user})
};

export default createReducer(initialState, actionHandlers);

export function loginSuccess(response, storage, redirect) {
  return dispatch => {
    if (response.status !== 'success') {
      dispatch({
        type: LOGIN_FAILURE,
        msg: JSON.stringify(response.message)
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        user: response.user
      });
      if (redirect) redirect();
    }
  };
}

export function loginFailure(error) {
  return dispatch => {
    dispatch({
      type: LOGIN_FAILURE,
      msg: error.toString()
    });
  };
}

export function login(queryString, storage, redirect) {
  return {
    type: LOGIN,
    apiRequest: (rpc) => rpc.formPost('/login', queryString),
    actions: {
      success: (response) => loginSuccess(response, storage, redirect),
      failure: (error) => loginFailure(error)
    }
  };
}

export function showError(err) {
  return {
    type: ERROR_SHOW,
    error: err
  };
}

export function closeError() {
  return {
    type: ERROR_CLOSE
  };
}

export function showSuccess(succ) {
  return {
    type: SUCCESS_SHOW,
    success: succ
  };
}

export function closeSuccess() {
  return {
    type: SUCCESS_CLOSE
  };
}

export function showMsg(msg) {
  return {
    type: ALERTMSG_SHOW,
    response: msg
  };
}

export function closeMsg() {
  return {
    type: ALERTMSG_CLOSE
  };
}

export function checkBackFlag(response, loginId, storage) {
  return dispatch => {
    if (response.fullName !== loginId) {
      if (storage) storage.remove('application/user');
      dispatch({
        type: LOGOUT_SUCCESS,
        msg: '后台登录超时,请重新登录!'
      });
    }
  };
}

export function getImg() {
  return {
    type: GET_IMG,
    apiRequest: (rpc) => rpc.jsonGet('/login/imgcheckcode.do')
  };
}

export function checkBack(loginId, storage) {
  return {
    type: CHECK_BACK,
    apiRequest: (rpc) => rpc.jsonGet('/security/currUser'),
    actions: {
      success: (response) => checkBackFlag(response, loginId, storage)
    }
  };
}

export function logoutSuccess(response) {
  return dispatch => {
    if (response.status === 'OK') {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }
  };
}

export function logout() {
  return {
    type: LOGOUT,
    apiRequest: (rpc) => rpc.jsonGet('/acct/logout'),
    actions: {
      success: (response) => logoutSuccess(response)
    }
  };
}

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    user: userInfo
  };
}
