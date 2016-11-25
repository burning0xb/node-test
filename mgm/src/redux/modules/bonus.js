import createReducer from '../utils/createReducer';
import dataFormat from '../../web/utils/DataFormat';
import { sortMethod } from '../../redux/utils/sort';

export const NULL = 'BONUS/NULL';
export const SUBMIT = 'BONUS/SUBMIT';
export const PAYBACKFINDALLSUCCESS = 'BONUS/PAYBACKFINDALLSUCCESS';
export const FINDALLSUCCESS = 'BONUS/FINDALLSUCCESS';
export const SEARCHSUCCESS = 'BONUS/SEARCHSUCCESS';
export const SUBMIT_FAILURE = 'BONUS/SUBMIT_FAILURE';
export const FINDBOUSTRACKIDSUCCESS = 'BONUS/FINDBOUSTRACKIDSUCCESS';
export const SETPAGENOW = 'BONUS/SETPAGENOW';
export const SORT = 'BONUS/SORT';
const initialState = {

};
const actionHandlers = {
  [NULL]: () => ({ }),
  [PAYBACKFINDALLSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, pageNow: action.pageNow, findStatus: 'payBackfindAll' }),
  [FINDALLSUCCESS]: (state, action) => ({ list: action.response.list, pageCount: action.response.pageCount, findStatus: 'findAll', pageNow: action.pageNow }),
  [SUBMIT_FAILURE]: (action) => ({ result: action.result, msg: 'failure' }),
  [SETPAGENOW]: (state, action) => ({ pageNow: action.pageNow }),
  [SORT]: (state, action) => { state.list = sortMethod(state.list, action.key, action.status); },
  [FINDBOUSTRACKIDSUCCESS]: (state, action) => ({ Info: action.Info }),
  [SEARCHSUCCESS]: (state, action) => ({ list: action.list, findStatus: 'searchBonusTrack', findStatus2: 'search', pageCount: action.pageCount, input: action.input })
};
export default createReducer(initialState, actionHandlers);

// export function payBackfindAll(json, num) {
//   return {
//     rpcUrl: '/exhibit/payBackfindAll?' + dataFormat(json),
//     SUCC_TYPE: PAYBACKFINDALLSUCCESS,
//     pageNow: num
//   };
// }
export function payBackfindAll(value, num) {
  return {
    rpcUrl: '/Exhibit/payBackfindAll',
    options: {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value),
    },
    SUCC_TYPE: PAYBACKFINDALLSUCCESS,
    pageNow: num
  };
}
export function findAll(json, num) {
  return {
    rpcUrl: '/Exhibit/findAll?' + dataFormat(json),
    SUCC_TYPE: FINDALLSUCCESS,
    pageNow: num
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
export function searchBonusTrackSuccess(response, info) {
  return {
    type: SEARCHSUCCESS,
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
      apiRequest: (rpc) => rpc.jsonPost('/Exhibit/search', info),
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
export function searchBonusTrack(info, num) {
  return dispatch => {
    dispatch({
      type: SUBMIT,
      apiRequest: (rpc) => rpc.jsonPost('/Exhibit/searchBonusTrack', info),
      actions: {
        success: (response) => searchBonusTrackSuccess(response, info),
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
