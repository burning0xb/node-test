import createReducer from '../utils/createReducer';
import { showError } from './application';

export const SET_FILTER = 'USERS/SET_FILTER';
export const SET_ACT_PAGE = 'USERS/SET_ACT_PAGE';
export const RECORD_CLICK = 'USERS/RECORD_CLICK';
export const GET_USERS = 'USERS/GET_USERS';
export const GET_USERS_COMPLETED = 'USERS/GET_USERS_COMPLETED';
export const REMOVE_USERS = 'USERS/REMOVE_USERS';
export const REMOVE_USERS_COMPLETED = 'USERS/REMOVE_USERS_COMPLETED';
export const REFRESH = 'USERS/REFRESH';
export const REFRESH_COMPLETED = 'USERS/REFRESH_COMPLETED';
export const FETCH_MORE = 'USERS/FETCH_MORE';
export const FETCH_MORE_COMPLETED = 'USERS/FETCH_MORE_COMPLETED';
export const SHOW_TOOLBAR = 'USERS/SHOW_TOOLBAR';
export const HIDE_TOOLBAR = 'USERS/HIDE_TOOLBAR';
export const SELECT_ALL = 'USERS/SELECT_ALL';
export const SUBMIT = 'USERS/SUBMIT';

const initialState = {
  actPage: 1,
  filter: {}
};

function convertToIds(users) {
  return users.map(user => user.userId);
}

const actionHandlers = {
  [GET_USERS]: () => ({ msg: 'rpc get users', state: 0 }),
  [SUBMIT]: () => ({ }),
  [GET_USERS_COMPLETED]: (state, action) => ({
    msg: 'rpc get users completed!', state: 1,
    users: action.users,
    ids: convertToIds(action.users),
    pageCount: action.pageCount
  }),
  [SET_FILTER]: (state, action) => ({ r: action.filter }),
  [SET_ACT_PAGE]: (state, action) => ({ actPage: action.actPage }),
  [RECORD_CLICK]: (state, action) => {
    const users = [...state.users];
    users[action.index] = { ...users[action.index], selected: !users[action.index].selected };
    return { users };
  },
  [REFRESH]: () => ({ msg: 'rpc get users', state: 0, actPage: 1 }),
  [REFRESH_COMPLETED]: (state, action) => ({
    msg: 'rpc get users completed!', state: 1,
    users: action.users,
    ids: convertToIds(action.users),
    pageCount: action.pageCount
  }),
  [FETCH_MORE]: (state) => ({ msg: 'rpc get users', state: 0, actPage: state.actPage + 1 }),
  [FETCH_MORE_COMPLETED]: (state, action) => {
    const users = [];
    const ids = [];
    action.users.forEach((user) => {
      if (state.ids.indexOf(user.userId) < 0) {
        users.push(user);
        ids.push(user.userId);
      } else {
        state.users[state.ids.indexOf(user.userId)] = user;
      }
    });
    return ({
      msg: 'rpc get users completed!', state: 1,
      users: state.users.concat(users),
      ids: state.ids.concat(ids),
      pageCount: action.pageCount
    });
  },
  [SHOW_TOOLBAR]: () => ({ showToolbar: true }),
  [HIDE_TOOLBAR]: (state) => ({ showToolbar: false, users: state.users.map(user => ({ ...user, selected: false })) }),
  [SELECT_ALL]: (state) => ({ users: state.users.map(user => ({ ...user, selected: true })) })
};

export default createReducer(initialState, actionHandlers);

export function getUsersCompleted(users, pageCount) {
  return { type: GET_USERS_COMPLETED, users, pageCount };
}

export function getUsers(filter, actPage) {
  return {
    type: GET_USERS,
    apiRequest: (rpc) => rpc.pagerPost('/profile/users', filter, actPage),
    actions: {
      success: (response) => getUsersCompleted(response.data, response.pageCount),
      failure: (error) => showError(error.toString())
    }
  };
}

export function removeUsers(users, filter, actPage) {
  const userIds = [];
  for (const user of users) {
    if (user.selected) {
      userIds.push(user.userId);
    }
  }
  return {
    type: REMOVE_USERS,
    apiRequest: (rpc) => rpc.jsonPost('/profile/removeUsers', userIds),
    actions: { success: (response) => {if (response) {return getUsers(filter, actPage);}} }
  };
}

export function removeUser(userId, redirect) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonGet(`/profile/removeUser/${userId}`),
    actions: {
      success: (response) => {
        if (response === true) {
          if (redirect) redirect();
        }
      }
    }
  };
}

export function refreshCompleted(users, pageCount) {
  return dispatch => setTimeout(() => dispatch({ type: REFRESH_COMPLETED, users, pageCount }), 100);
}

export function refresh(filter) {
  if (filter.status === 'T') {
    filter.status = undefined;
  }
  return {
    type: REFRESH,
    apiRequest: (rpc) => rpc.pagerPost('/profile/users', filter, 1),
    actions: { success: (response) => refreshCompleted(response.data, response.pageCount) }
  };
}

export function setFilter(filter) {
  return dispatch => {
    dispatch(refresh(filter));
    dispatch({ type: SET_FILTER, filter });
  };
}

export function setActPage(actPage, filter) {
  return dispatch => {
    dispatch(getUsers(filter, actPage));
    dispatch({ type: SET_ACT_PAGE, actPage });
  };
}

export function recordClick(index) {
  return { type: RECORD_CLICK, index };
}

export function fetchMoreCompleted(users, pageCount) {
  return { type: FETCH_MORE_COMPLETED, users, pageCount };
}

export function fetchMore(filter, actPage, pageCount, state) {
  if (state === 1 && actPage < pageCount) {
    return {
      type: FETCH_MORE,
      apiRequest: (rpc) => rpc.pagerPost('/profile/users', filter, actPage + 1),
      actions: { success: (response) => fetchMoreCompleted(response.data, response.pageCount) }
    };
  }
}

export function showToolbar() {
  return { type: SHOW_TOOLBAR };
}

export function hideToolbar() {
  return { type: HIDE_TOOLBAR };
}

export function selectAll() {
  return { type: SELECT_ALL };
}
