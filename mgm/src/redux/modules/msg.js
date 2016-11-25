import createReducer from '../../redux/utils/createReducer';
export const FINDALLNEWS = 'MSG/FINDALLNEWS';
export const SUBMIT_FAILURE = 'MSG/SUBMIT_FAILURE';
export const SUBMIT = 'MSG/SUBMIT';
export const CLEARPAGE = 'MSG/CLEARPAGE';
export const SEARCHSUCCESS = 'MSG/SEARCHSUCCESS';
export const FINDALLSUCCESS = 'MSG/FINDALLSUCCESS';
export const CLEAR = 'MSG/CLEAR';
export const SETPAGENOW = 'MSG/SETPAGENOW';
export const NULL = 'MSG/NULL';
const initialState = {
  list: undefined,
  pageNow: 1,
  pageCount: 1
};
const actionHandlers = {
  [SUBMIT]: () => ({ list: undefined }),
  [NULL]: () => ({ }),
  [CLEAR]: () => ({ upload: undefined, status: 80, material: false, upload2: undefined }),
  [CLEARPAGE]: () => ({ pageNow: 1 }),
  [SETPAGENOW]: (state, action) => ({ pageNow: action.pageNow }),
  [SEARCHSUCCESS]: (state, action) => ({ list: action.list, pageCount: action.pageCount }),
  [FINDALLSUCCESS]: (state, action) => ({ list: action.list, findStatus: 'findAll', pageCount: action.pageCount }),
  [FINDALLNEWS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount })
};
export function submitFailure() {
  return dispatch => {
    dispatch({
      type: SUBMIT_FAILURE
    });
  };
}

export function searchSuccess(response) {
  return {
    type: SEARCHSUCCESS,
    pageCount: response.pageCount,
    list: response.list
  };
}

export function findAllSuccess(response) {
  return {
    type: FINDALLSUCCESS,
    pageCount: response.pageCount,
    list: response.list
  };
}

export default createReducer(initialState, actionHandlers);

export function clearPage() {
  return {
    type: CLEARPAGE
  };
}

// 查询
export function findAll(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/msg/findAll', info),
    actions: {
      success: (response) => findAllSuccess(response),
      failure: () => submitFailure()
    }
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

export function setPageNow(num, info, flag) {
  if (flag === 1) {
    return {
      type: SETPAGENOW,
      pageNow: num,
      apiRequest: (rpc) => rpc.formPost('/material/findAll', info),
      actions: {
        success: (response) => findAllSuccess(response),
        failure: () => submitFailure()
      }
    };
  }
  if (flag === 0) {
    return dispatch => {
      dispatch(search(info, num));
    };
  }
}

export function clear() {
  return {
    type: CLEAR
  };
}
