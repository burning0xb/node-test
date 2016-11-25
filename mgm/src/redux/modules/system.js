import createReducer from '../utils/createReducer';
import { sortMethod } from '../../redux/utils/sort';

export const NULL = 'SYSTEM/NULL';
export const SUBMIT = 'SYSTEM/SUBMIT';
export const FINDALLSUCCESS = 'SYSTEM/FINDALLSUCCESS';
export const SEARCHSUCCESS = 'SYSTEM/SEARCHSUCCESS';
export const SEARCHINTERFACESUCCESS = 'SYSTEM/SEARCHINTERFACESUCCESS';
export const SUBMIT_FAILURE = 'SYSTEM/SUBMIT_FAILURE';
export const SETPAGENOW = 'SYSTEM/SETPAGENOW';
export const FINDINTREFACEALLSUCCESS = 'SYSTEM/FINDINTREFACEALLSUCCESS';
export const SORT = 'SYSTEM/SORT';
const initialState = {
  pageNow: 1,
  pageCount: 1,
  list: undefined
};
const actionHandlers = {
  [NULL]: () => ({ }),
  [SUBMIT]: () => ({}),
  [FINDALLSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, findStatus: 'findAll', pageNow: action.pageNow }),
  [FINDINTREFACEALLSUCCESS]: (state, action) => ({ list: action.list, pageCount: action.pageCount, findStatus: 'findAllInterface' }),
  [SUBMIT_FAILURE]: (action) => ({ result: action.result, msg: 'failure' }),
  [SETPAGENOW]: (state, action) => ({ pageNow: action.pageNow }),
  [SORT]: (state, action) => { state.list = sortMethod(state.list, action.key, action.status); },
  [SEARCHINTERFACESUCCESS]: (state, action) => ({ list: action.list, findStatus2: 'searchInterface', pageCount: action.pageCount, input: action.input }),
  [SEARCHSUCCESS]: (state, action) => ({ list: action.list, findStatus: 'findAll', findStatus2: 'search', pageCount: action.pageCount, input: action.input })
};
export default createReducer(initialState, actionHandlers);
export function findAll(json, num) {
  return {
    rpcUrl: '/logManage/findAll',
    options: {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    },
    SUCC_TYPE: FINDALLSUCCESS,
    pageNow: num
  };
}

export function findAllInterfaceSuccess(response) {
  return {
    type: FINDINTREFACEALLSUCCESS,
    pageCount: response.pageCount,
    list: response.list
  };
}

// 查询
export function findAllInterface(info, num) {
  return dispatch => {
    dispatch({
      type: SUBMIT,
      apiRequest: (rpc) => rpc.jsonPost('/logManage/findAllInterface', info),
      actions: {
        success: (response) => findAllInterfaceSuccess(response)
      }
    });
    dispatch({
      type: SETPAGENOW,
      pageNow: num
    });
  };
}

export function searchSuccess(response, info) {
  return {
    type: SEARCHSUCCESS,
    pageCount: response.pageCount,
    list: response.list,
    input: info
  };
}
export function searchInterfaceSuccess(response, info) {
  return {
    type: SEARCHINTERFACESUCCESS,
    pageCount: response.pageCount,
    list: response.list,
    input: info
  };
}
export function submitFailure() {
  return dispatch => {
    dispatch({
      type: SUBMIT_FAILURE
    });
  };
}

// 查询
export function search(info, num) {
  return dispatch => {
    dispatch({
      type: SUBMIT,
      apiRequest: (rpc) => rpc.jsonPost('/logManage/findAll', info),
      actions: {
        success: (response) => searchSuccess(response, info),
        failure: () => submitFailure()
      }
    });
    dispatch({
      type: SETPAGENOW,
      pageNow: num
    });
  };
}
export function searchInterface(info, num) {
  return dispatch => {
    dispatch({
      type: SUBMIT,
      apiRequest: (rpc) => rpc.jsonPost('/logManage/findAllInterface', info),
      actions: {
        success: (response) => searchInterfaceSuccess(response, info),
        failure: () => submitFailure()
      }
    });
    dispatch({
      type: SETPAGENOW,
      pageNow: num
    });
  };
}
// 排序
export function sort(kk, flag) {
  return {
    type: SORT,
    key: kk,
    status: flag
  };
}
