import createReducer from '../utils/createReducer';
// import dataFormat from '../../web/utils/DataFormat';
// import formToJson from '../../web/utils/formToJson.js';

export const NULL = 'SYNTHESIZE/NULL';
export const USERFINDALLSUCCESS = 'SYNTHESIZE/USERFINDALLSUCCESS';
export const FINDUSERBYUSERID = 'SYNTHESIZE/FINDUSERBYUSERID';
const initialState = {
  list: undefined,
  va: undefined,
  userlist: undefined
};
const actionHandlers = {
  [NULL]: () => ({ }),
  [USERFINDALLSUCCESS]: (state, action) => ({ userlist: action.response.userlist, pageCount: action.response.pageCount, pageNow: action.pageNow }),
  [FINDUSERBYUSERID]: (state, action) =>({ UserDetail: action.response.UserDetail })
};
export default createReducer(initialState, actionHandlers);
export function authSuccess(response) {
  return {
    type: USERFINDALLSUCCESS,
    response
  };
}

export function userFindAll(value, num) {
  return {
    rpcUrl: '/com/userFindAll',
    options: {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value),
    },
    SUCC_TYPE: USERFINDALLSUCCESS,
    pageNow: num
  };
}
export function findUserByUsrNo(usrNo) {
  return {
    rpcUrl: '/com/findUserByUsrNo?usrNo=' + usrNo,
    SUCC_TYPE: FINDUSERBYUSERID
  };
}
