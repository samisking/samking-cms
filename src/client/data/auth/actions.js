import { postJSON } from 'sk-fetch-wrapper';
import * as types from './actionTypes';

export const login = ({ username, password }) => (dispatch) => {
  dispatch({
    type: types.LOGIN_REQUEST
  });

  return postJSON('/login', { username, password })
    .then(res => {
      localStorage.setItem('token', res.token); // eslint-disable-line no-undef

      dispatch({
        type: types.LOGIN_SUCCESS,
        token: res.token
      });
    })
    .catch(err => {
      dispatch({
        type: types.LOGIN_FAILURE,
        error: err
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // eslint-disable-line no-undef

  dispatch({
    type: types.LOGOUT
  });
};

export const verifyToken = (token) => (dispatch) => {
  dispatch({
    type: types.TOKEN_VERIFY_REQUEST
  });

  return postJSON('/verify-login', { token })
    .then(res => {
      dispatch({
        type: types.TOKEN_VERIFY_SUCCESS,
        token: res.token
      });
    })
    .catch(err => {
      dispatch(logout());

      dispatch({
        type: types.TOKEN_VERIFY_FAILURE,
        error: err
      });
    });
};
