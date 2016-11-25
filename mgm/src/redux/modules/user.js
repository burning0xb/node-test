import createReducer from '../utils/createReducer';

export const GET_USER_COMPLETED = 'USER/GET_USER_COMPLETED';
export const CLEAR_USER = 'USER/CLEAR_USER';
export const RPC_REQUEST = 'USER/RPC_REQUEST';
export const ADD_ERROR = 'USER/ADD_ERROR';
export const REMOVE_ERROR = 'USER/REMOVE_ERROR';
export const CLEAR_ERROR = 'USER/CLEAR_ERROR';
export const GET_ROLE = 'USER/GET_ROLE';
export const GETROLESUCCESS = 'USER/GETROLESUCCESS';
export const ADDUSER = 'USER/ADDUSER';
export const ADDSUCCESS = 'USER/ADDSUCCESS';
export const CHANGES = 'USER/CHANGES';
export const CLEARUSERNAME = 'USER/CLEARUSERNAME';
export const CLEARPASS = 'USER/CLEARPASS';
const initialState = {
  user: {},
  errors: {},
  roleInfo: []
};

const actionHandlers = {
  [GET_USER_COMPLETED]: (state, action) => ({ user: action.user, errors: {} }),
  [CLEAR_USER]: () => ({ user: {}, errors: {} }),
  [ADD_ERROR]: (state, action) => ({ errors: { ...state.errors, ...action.error } }),
  [REMOVE_ERROR]: (state, action) => {
    delete state.errors[action.name];
    return { errors: { ...state.errors } };
  },
  [CLEAR_ERROR]: () => ({ errors: {} }),
  [GETROLESUCCESS]: (state, action) => ({ roleInfo: action.response }),
  [ADDSUCCESS]: (state, action) => ({ response: action.response }),
  [CHANGES]: (state, action) => {
    if (state.user === null || state.user === undefined) {
      state.user = {};
    }
    state.user[action.name] = action.value;
  },
  [CLEARUSERNAME]: (state, action) => {
    state.user[action.name] = action.value;
  },
  [CLEARPASS]: (state, action) => {
    state.user[action.pass] = action.value;
  },
};
export function getSuccess(response) {
  return dispatch => {
    dispatch({
      type: GETROLESUCCESS,
      response: response.role
    });
  };
}
export function clearuser() {
  return {
    type: CLEARUSERNAME,
    name: 'name',
    value: undefined
  };
}
export function clearpass() {
  return {
    type: CLEARPASS,
    pass: 'password',
    value: undefined
  };
}
export default createReducer(initialState, actionHandlers);
export function getRole() {
  return dispatch => {
    dispatch({
      type: GET_ROLE,
      apiRequest: (rpc) => rpc.jsonPost('/profile/getRole'),
      actions: {
        success: (response) => getSuccess(response)
      }
    });
  };
}
export function getUserCompleted(user) {
  return { type: GET_USER_COMPLETED, user };
}

export function getUser(userId) {
  return {
    type: RPC_REQUEST,
    apiRequest: (rpc) => rpc.jsonGet(`/profile/user/${userId}`),
    actions: { success: (response) => getUserCompleted(response) }
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  };
}

export function addError(error) {
  return { type: ADD_ERROR, error };
}

export function removeError(name, errors) {
  if (errors[name]) {return { type: REMOVE_ERROR, name };}
  return null;
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

export function updateUser(user, redirect) {
  return {
    type: RPC_REQUEST,
    apiRequest: (rpc) => rpc.jsonPost('/profile/updateUser', user),
    actions: { success: (response) => {
      return () => {if (response && redirect) {redirect();}};
    } }
  };
}

// export function addUser(user, redirect) {
//   return {
//     type: RPC_REQUEST,
//     apiRequest: (rpc) => rpc.jsonPost('/profile/addUser', user),
//     actions: { success: (response) => {
//       return () => {if (response && redirect) {redirect();}};
//     } }
//   };
// }
export function addSuccess(response, redirect) {
  if (response.success && response.success !== null && redirect) {
    return redirect(response.success);
  }
  if (response.reason && response.reason !== null) {
    return redirect(response.reason);
  }
  if (response.fail && response.fail !== null) {
    return redirect(response.fail);
  }
  return dispatch => {
    dispatch({
      type: ADDSUCCESS,
      response
    });
  };
}
export function addUser(user, redirect) {
  return dispatch => {
    dispatch({
      type: ADDUSER,
      apiRequest: (rpc) => rpc.jsonPost('/profile/addUser', user),
      actions: {
        success: (response) => addSuccess(response, redirect)
      }
    });
  };
}
export function removeUser(userId, redirect) {
  return {
    type: RPC_REQUEST,
    apiRequest: (rpc) => rpc.jsonGet(`/profile/removeUser/${userId}`),
    actions: {
      success: (response) => {
        return () => {if (response && redirect) {redirect();}};
      }
    }
  };
}

export function change(name, value) {
  return {
    type: CHANGES,
    name: name,
    value: value
  };
}
