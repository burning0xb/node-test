import createReducer from '../utils/createReducer';

export const CLICK = 'AUTH/CLICK';
export const LOAD = 'AUTH/LOAD';

const actionHandlers = {
  /*[LOAD]: (state, action) => ({ ...action.auths }),
  [CLICK]: (state, action) => ({

    if (state[action.auth].value == true)
    {
      state[action.auth].value = false;
      return state;
    }
    else {
      state[action.auth].value = true;
      if (state[action.auth].children) {
        state[action.auth].chidlren.map(
          (child) => {state[child].value = true;
        });
      }

      return state;
    }
  })*/
};

export function loadAuths(auths) {
  return {
    type: LOAD,
    auths
  };
}

export function checkClick(auth, type) {
  return {
    type: CLICK,
    auth
  };
}

export default createReducer(initialState, actionHandlers);
