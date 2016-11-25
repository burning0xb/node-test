export default function apiRequestMiddleware(client) {
  return ({ dispatch }) => {
    return next => action => {
      if (action) {
        const { apiRequest, actions } = action;
        if (apiRequest) {
          apiRequest(client).then(
            (response) => {
              if (actions && actions.success) {
                dispatch(actions.success(response));
              }
            },
            (error) => {
              if (actions && actions.failure) {
                dispatch(actions.failure(error));
              }
            }
          );
        }
        return next(action);
      }
    };
  };
}
