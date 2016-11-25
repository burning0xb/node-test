import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../modules/application';

export default function persistenceHandler(storage) {
  return next => {
    return (reducer, initialState) => {
      const store = next(reducer, initialState);
      return Object.assign({}, store, {
        dispatch(action) {
          store.dispatch(action);

          switch (action.type) {
            case LOGIN_SUCCESS:
              storage.put('user', JSON.stringify(action.user));
              break;
            case LOGOUT_SUCCESS:
              storage.remove('user');
              break;
            default:
          }

          return action;
        }
      });
    };
  };
}
