import createReducer from '../utils/createReducer';

export const FLUSH_STATE = 'MENU/FLUSH_STATE';
export const SUBMIT = 'MENU/SUBMIT';
export const RESET = 'MENU/RESET';

const initialState = {
  currentIndex: 100
};

const actionHandlers = {
  [FLUSH_STATE]: (state, action) => ({ currentIndex: action.index })
};

export default createReducer(initialState, actionHandlers);

export function flushState(index) {
  return { type: FLUSH_STATE, index };
}

export function resetSucess(response) {
  alert(response);
}

export function createbanner(obj) {
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonPost('/acct/createbanner', obj),
    actions: {
      success: (response) => resetSucess(response)
    }
  };
}

export function selectProdSucess(response) {
  alert(response);
}

export function selectProd(select, brand, color) {
  console.log(select);
  console.log(brand);
  console.log(color);
  const request = {
    select: select,
    brand: brand,
    color: color
  };
  return {
    type: SUBMIT,
    apiRequest: (rpc) => rpc.jsonPost('/acct/selectProd', request),
    actions: {
      success: (response) => selectProdSucess(response)
    }
  };
}
