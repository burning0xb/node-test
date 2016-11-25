import createReducer from '../../utils/createReducer';
import { sortMethod } from '../../utils/sort';

export const SUBMIT = 'BAIL/SUBMIT';
export const SUBMIT_FAILURE = 'BAIL/SUBMIT_FAILURE';
export const CLEARPAGE = 'BAIL/CLEARPAGE';
export const SORT = 'BAIL/SORT';
export const FINDALLSUCCESS = 'BAIL/FINDALLSUCCESS';
export const SEARCHSUCCESS = 'BAIL/SEARCHSUCCESS';
export const FINDBAILCOUNTSUCCESS = 'BAIL/FINDBAILCOUNTSUCCESS';
export const SEARCHBAILLSUCCESS = 'BAIL/SEARCHBAILLSUCCESS';
export const FETCHPAGE = 'BAIL/FETCHPAGE';
export const FETCHPAGESUCCESS = 'BAIL/FETCHPAGESUCCESS';
export const SEARCHCHKSUCCESS = 'BAIL/SEARCHCHKSUCCESS';
export const PAGINATIONSUCCESS = 'BAIL/PAGINATIONSUCCESS';
export const PAGINATION = 'BAIL/PAGINATION';

const initialState = {

};
const actionHandlers = {
  [SUBMIT]: () => ({ }),
  [CLEARPAGE]: () => ({ pageNow: 1 }),
  [SUBMIT_FAILURE]: (action) => ({ result: action.result, msg: 'failure' }),
  [SORT]: (state, action) => { state.list = sortMethod(state.list, action.key, action.status); },
  [FINDALLSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, pageNow: 1 }),
  [SEARCHSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, pageNow: 1 }),
  [SEARCHCHKSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, pageNow: 1 }),
  [SEARCHBAILLSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, pageNow: 1 }),
  [FINDBAILCOUNTSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, pageNow: 1 }),
  [FETCHPAGESUCCESS]: (state, action) => ({ list: action.response.list, pageNow: action.response.pageNow }),
  [PAGINATIONSUCCESS]: (state, action) => ({ list: action.response.list, pageNow: action.response.pageNow }),
};
export default createReducer(initialState, actionHandlers);

export function submitFailure() {
  return dispatch => {
    dispatch({
      type: SUBMIT_FAILURE
    });
  };
}

export function findAllSuccess(response) {
  return dispatch => {
    dispatch({
      type: FINDALLSUCCESS,
      response
    });
  };
}

export function searchSuccess(response) {
  return dispatch => {
    dispatch({
      type: SEARCHSUCCESS,
      response
    });
  };
}

export function searchChkSuccess(response) {
  return dispatch => {
    dispatch({
      type: SEARCHCHKSUCCESS,
      response
    });
  };
}

export function findBailCountSuccess(response) {
  return dispatch => {
    dispatch({
      type: FINDBAILCOUNTSUCCESS,
      response
    });
  };
}
export function searchBaillSuccess(response) {
  return dispatch => {
    dispatch({
      type: SEARCHBAILLSUCCESS,
      response
    });
  };
}


// ============================================================
export function fetchPagesuccess(response) {
  return dispatch => {
    dispatch({
      type: FETCHPAGESUCCESS,
      response
    });
  };
}

export function fetchPage(pageNow) {
  return dispatch => {
    dispatch({
      type: FETCHPAGE,
      apiRequest: (rpc) => rpc.formPost('/bail/fetchPage', 'pageNow=' + pageNow),
      actions: {
        success: (response) => fetchPagesuccess(response, pageNow)
      }
    });
  };
}

export function paginationsuccess(response) {
  return dispatch => {
    dispatch({
      type: PAGINATIONSUCCESS,
      response
    });
  };
}

export function pagination(pageNow) {
  return dispatch => {
    dispatch({
      type: PAGINATION,
      apiRequest: (rpc) => rpc.formPost('/bail/pagination', 'pageNow=' + pageNow),
      actions: {
        success: (response) => paginationsuccess(response, pageNow)
      }
    });
  };
}


export function clearPage() {
  return {
    type: CLEARPAGE
  };
}

export function search(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonPost('/bail/search', info),
    actions: {
      success: (response) => searchSuccess(response),
      failure: () => submitFailure()
    }
  };
}

export function searchChk(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonPost('/bail/searchChk', info),
    actions: {
      success: (response) => searchChkSuccess(response),
      failure: () => submitFailure()
    }
  };
}

export function searchBaill(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonPost('/bail/searchBaill', info),
    actions: {
      success: (response) => searchBaillSuccess(response),
      failure: () => submitFailure()
    }
  };
}

 // 查询
export function findAll() {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/bail/findAll'),
    actions: {
      success: (response) => findAllSuccess(response),
      failure: () => submitFailure()
    }
  };
}

export function findBailCount() {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/bail/findBailCount'),
    actions: {
      success: (response) => findBailCountSuccess(response),
      failure: () => submitFailure()
    }
  };
}

// 排序
export function sort(ke, flag) {
  return {
    type: SORT,
    key: ke,
    status: flag
  };
}
