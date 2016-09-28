import initialState from './initialState';
import * as types from './actionTypes';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.TOKEN_VERIFY_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case types.LOGIN_SUCCESS:
    case types.TOKEN_VERIFY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loggedIn: true,
        token: action.token
      });

    case types.LOGIN_FAILURE:
    case types.TOKEN_VERIFY_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: action.error.message,
        errorStatus: action.error.status
      });

    case types.LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
        token: null
      });

    default:
      return state;
  }
};
