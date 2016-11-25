import createReducer from '../utils/createReducer';
export const ADD_ROLE = 'ROLE/ADD_ROLE';
export const ADD_SUCCESS = 'ROLE/ADD_SUCCESS';
export const GET_ROLE = 'ROLE/GET_ROLE';
export const GETROLESUCCESS = 'ROLE/GETROLESUCCESS';
export const UPDATE_ROLE = 'ROLE/UPDATE_ROLE';
export const UPDATEROLESUCCESS = 'ROLE/UPDATEROLESUCCESS';
export const GET_AUTH = 'ROLE/UPDATEROLESUCCESS';
export const AUTHSUCCESS = 'ROLE/AUTHSUCCESS';
export const GET_USERROLES = 'ROLE/GET_USERROLES';
export const GET_USERROLE = 'ROLE/GET_USERROLE';
export const GET_SUCCESS = 'ROLE/GET_SUCCESS';
export const UPDATEUSERROLE = 'ROLE/UPDATEUSERROLE';
export const UPDATESUCCESS = 'ROLE/UPDATESUCCESS';
export const GETROLENAME = 'ROLE/GETROLENAME';
export const GET_ROLENAME_SUCCESS = 'ROLE/GET_ROLENAME_SUCCESS';
export const REMOVEROLESUCCESS = 'ROLE/REMOVEROLESUCCESS';
export const CLEAR = 'ROLE/CLEAR';
const initialState = {
  role: {},
  roleInfo: {},
  delete: false,
  response: undefined,
  userrole: {},
  roleName: {},
  userInfo: {},
  authorities: []
};

const actionHandlers = {
  [CLEAR]: () => ({ delete: false }),
  [GET_USERROLE]: () => ({ }),
  [GETROLESUCCESS]: (state, action) => ({ roleInfo: action.response }),
  [GET_USERROLES]: (state, action) => ({ userrole: action.response }),
  [GET_SUCCESS]: (state, action) => ({ userInfo: action.response }),
  [AUTHSUCCESS]: (state, action) => ({ authorities: action.response }),
  [ADD_SUCCESS]: (state, action) => ({ response: action.response }),
  [REMOVEROLESUCCESS]: () => ({ delete: true }),
  [GET_ROLENAME_SUCCESS]: (state, action) => ({ roleName: action.response })
};
export function addSuccess(response, redirect) {
  if (response && response === true && redirect) {
    return redirect();
  }
  if (response === false) {
    alert('角色ID已经存在请更换');
  }
  return dispatch => {
    dispatch({
      type: ADD_SUCCESS,
      response
    });
  };
}
export function addRole(role, redirect) {
  return dispatch => {
    dispatch({
      type: ADD_ROLE,
      apiRequest: (rpc) => rpc.jsonPost('/profile/addRole', role),
      actions: {
        success: (response) => addSuccess(response, redirect)
      }
    });
  };
}
export function authSuccess(response) {
  return {
    type: AUTHSUCCESS,
    response
  };
}

// 获取默认第一个角色的权限
export function getauth(response) {
  const roleId = response.role[0].roleId;
  return {
    rpcUrl: '/profile/auth?roleId=' + roleId,
    succ: AUTHSUCCESS
  };
}

// 获取系统所有角色
export function getRole() {
  return {
    rpcUrl: '/profile/getRole',
    SUCC_TYPE: GETROLESUCCESS
  };
}

// 获取角色描述
export function getRoleName() {
  return {
    rpcUrl: '/profile/getRoleName',
    SUCC_TYPE: GET_ROLENAME_SUCCESS
  };
}

export function getAuthSuccess(response) {
  return dispatch => {
    dispatch({
      type: GETROLESUCCESS,
      response: response.role
    });
  };
}
export function removeRoleSuccess(response) {
  if (response.result === 'success') {
    return {
      type: REMOVEROLESUCCESS
    };
  }
}
export function getRoleAuth(roleId) {
  return dispatch => {
    dispatch({
      type: GET_AUTH,
      apiRequest: (rpc) => rpc.formPost('/profile/getAuthRole', 'roleId=' + roleId),
      actions: {
        success: (response) => getAuthSuccess(response)
      }
    });
  };
}
export function removeRole(roleId) {
  return dispatch => {
    dispatch({
      type: GET_AUTH,
      apiRequest: (rpc) => rpc.formPost('/profile/removeRole', 'roleId=' + roleId),
      actions: {
        success: (response) => removeRoleSuccess(response)
      }
    });
  };
}
export function updateSuccess(response, redirect) {
  if (response.success && response.success === 'success' && redirect) {
    return redirect(response.msg);
  }
  if (response.fail && response.fail === 'error') {
    return redirect(response.msg);
  }
  return dispatch => {
    dispatch({
      type: UPDATEROLESUCCESS,
      response
    });
  };
}
export function updateRole(filter, redirect) {
  return dispatch => {
    dispatch({
      type: UPDATE_ROLE,
      apiRequest: (rpc) => rpc.jsonPost('/profile/updateRole', filter),
      actions: {
        success: (response) => updateSuccess(response, redirect)
      }
    });
  };
}
export function getUserRoleSuccess(response) {
  console.log(1);
  return dispatch => {
    dispatch({
      type: GET_USERROLES,
      response
    });
  };
}
export function getUserRole(userId) {
  return dispatch => {
    dispatch({
      type: GET_USERROLE,
      apiRequest: (rpc) => rpc.jsonGet(`/profile/userrole/${userId}`),
      actions: { success: (response) => getUserRoleSuccess(response) }
    });
  };
}
export function getuserSuccess(response) {
  return dispatch => {
    dispatch({
      type: GET_SUCCESS,
      response
    });
  };
}
export function getUser(userId) {
  return dispatch => {
    dispatch({
      type: GET_USERROLE,
      apiRequest: (rpc) => rpc.jsonGet(`/profile/user/${userId}`),
      actions: { success: (response) => getuserSuccess(response) }
    });
  };
}
export function success(response, redirect) {
  if (response.success && response.success === 'success' && redirect) {
    alert(response.msg);
    return redirect();
  }
  if (response.fail && response.fail === 'error') {
    alert(response.msg);
  }
  return dispatch => {
    dispatch({
      type: UPDATESUCCESS,
      response
    });
  };
}
export function update(data, redirect) {
  return dispatch => {
    dispatch({
      type: UPDATE_ROLE,
      apiRequest: (rpc) => rpc.jsonPost('/profile/updateUserRole', data),
      actions: {
        success: (response) => success(response, redirect)
      }
    });
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}


export default createReducer(initialState, actionHandlers);
