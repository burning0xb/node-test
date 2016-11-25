import createReducer from '../../redux/utils/createReducer';
export const FINDALL = 'MATERIAL/FINDALL';
export const FINDALLNEWS = 'MATERIAL/FINDALLNEWS';
export const SUBMIT_FAILURE = 'MATERIAL/SUBMIT_FAILURE';
export const SUBMIT = 'MATERIAL/SUBMIT';
export const CLEARPAGE = 'MATERIAL/CLEARPAGE';
export const SEARCHSUCCESS = 'MATERIAL/SEARCHSUCCESS';
export const FINDALLSUCCESS = 'MATERIAL/FINDALLSUCCESS';
export const FINDMATERIALBYIDSUCCESS = 'MATERIAL/FINDMATERIALBYIDSUCCESS';
export const UPLOAD2SUCCESS = 'MATERIAL/UPLOAD2SUCCESS';
export const UPLOADSUCCESS = 'MATERIAL/UPLOADSUCCESS';
export const FINDMATERIALSUCCESS = 'MATERIAL/FINDMATERIALSUCCESS';
export const CLEAR = 'MATERIAL/CLEAR';
export const SETPAGENOW = 'MATERIAL/SETPAGENOW';
export const MATERIALSUCCESS = 'MATERIAL/MATERIALSUCCESS';
export const NULL = 'MATERIAL/NULL';
const initialState = {
  list: undefined,
  upload: undefined,
  pageNow: 1,
  pageCount: 1,
  status: 80,
  material: false,
  Base64: undefined
};
const actionHandlers = {
  [SUBMIT]: () => ({ list: undefined }),
  [NULL]: () => ({ }),
  [CLEAR]: () => ({ upload: undefined, status: 80, material: false, upload2: undefined }),
  [FINDALL]: (state, action) => ({list: action.response.list, pageCount: action.response.pageCount}),
  [CLEARPAGE]: () => ({ pageNow: 1 }),
  [SETPAGENOW]: (state, action) => ({ pageNow: action.pageNow }),
  [SEARCHSUCCESS]: (state, action) => ({ list: action.list, pageCount: action.pageCount }),
  [FINDALLSUCCESS]: (state, action) => ({ list: action.list, findStatus: 'findAll', pageCount: action.pageCount }),
  [FINDALLNEWS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount }),
  [UPLOADSUCCESS]: (state, action) => ({ upload: 'ok', status: 100, Base64: action.base64 }),
  [UPLOAD2SUCCESS]: (state, action) => ({ upload2: 'ok', url: action.url, base64: action.base64 }),
  [FINDMATERIALBYIDSUCCESS]: (state, action) => ({ list: action.list }),
  [MATERIALSUCCESS]: () => ({ material: true }),
  [FINDMATERIALSUCCESS]: (state, action) => ({ list: action.list })
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

export function findMaterialByIdSuccess(response) {
  return {
    type: FINDMATERIALBYIDSUCCESS,
    list: response.list
  };
}

export function findMaterialsSuccess(response) {
  return {
    type: FINDMATERIALSUCCESS,
    list: response.list
  };
}

export function upLoadSuccess(response) {
  if (response.result === 'success') {
    return {
      type: UPLOADSUCCESS,
      base64: response.base64
    };
  }
}

export function upLoad2Success(response) {
  if (response.result === 'success') {
    return {
      type: UPLOAD2SUCCESS,
      url: response.url,
      base64: response.base64
    };
  }
}

export function materialSuccess(response) {
  if (response.result === 'success') {
    return {
      type: MATERIALSUCCESS
    };
  }
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
    apiRequest: (rpc) => rpc.formPost('/material/findAll', info),
    actions: {
      success: (response) => findAllSuccess(response),
      failure: () => submitFailure()
    }
  };
}

// 查询
export function findMaterialById(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/material/findMaterialById', info),
    actions: {
      success: (response) => findMaterialByIdSuccess(response),
      failure: () => submitFailure()
    }
  };
}

// 查询
export function findMaterials() {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.formPost('/material/findMaterials'),
    actions: {
      success: (response) => findMaterialsSuccess(response),
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

// 上传文件
export function upLoad(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.filePost('/material/upload', info),
    actions: {
      success: (response) => upLoadSuccess(response),
      failure: () => submitFailure()
    }
  };
}

// 上传文件
export function upLoad2(info) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.filePost('/material/upload2', info),
    actions: {
      success: (response) => upLoad2Success(response),
      failure: () => submitFailure()
    }
  };
}

export function sMaterial(info) {
  return {
    type: NULL,
    apiRequest: (rpc) => rpc.jsonPost('/material/SMaterial', info),
    actions: {
      success: (response) => materialSuccess(response),
      failure: () => submitFailure()
    }
  };
}

export function mMaterial(info) {
  return {
    type: NULL,
    apiRequest: (rpc) => rpc.formPost('/material/mMaterial', info),
    actions: {
      success: (response) => materialSuccess(response),
      failure: () => submitFailure()
    }
  };
}

export function deleteMaterial(info) {
  return {
    type: NULL,
    apiRequest: (rpc) => rpc.formPost('/material/deleteMaterial', info),
    actions: {
      success: (response) => materialSuccess(response),
      failure: () => submitFailure()
    }
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

export function findAllNews(curPage) {
  return {
    rpcUrl: '/material/findAllNews?curPage=' + curPage,
    SUCC_TYPE: FINDALLNEWS
  };
}
