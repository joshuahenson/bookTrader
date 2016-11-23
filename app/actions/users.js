import axios from 'axios';
import { push } from 'react-router-redux';
import { startSubmit, stopSubmit } from 'redux-form';
import { dismissMessage } from './messages';
import * as types from '../types';

const getMessage = res => res.response.data.message;

// Log In Action Creators
export function googleLogin() {
  return { type: types.GOOGLE_LOGIN_USER };
}

export function loginSuccess(message, userName, userId) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    userName,
    userId
  };
}

// Sign Up Action Creators
export function signUpSuccess(message, userName, userId) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
    userName,
    userId
  };
}

// Log Out Action Creators
export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

export function logoutError() {
  return {
    type: types.LOGOUT_ERROR_USER,
    message: 'There was an error attempting to log out.'
  };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function userIsWaiting() {
  return {
    type: types.IS_WAITING
  };
}

export function userIsNotWaiting() {
  return {
    type: types.IS_NOT_WAITING
  };
}

export function manualLogin(data, form) {
  return dispatch => {
    dispatch(startSubmit(form));

    return axios.post('/login', data)
      .then(response => {
        dispatch(loginSuccess(response.data.message, response.data.userName, response.data.userId));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 3000);
        dispatch(push('/'));
        dispatch(stopSubmit(form, {}));
      })
      .catch(err => {
        dispatch(stopSubmit(form, {_error: getMessage(err)}));
      });
  };
}

export function signUp(data, form) {
  return dispatch => {
    dispatch(startSubmit(form));

    return axios.post('/signup', data)
      .then(response => {
        dispatch(signUpSuccess(response.data.message, response.data.userName, response.data.userId));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 3000);
        dispatch(push('/'));
        dispatch(stopSubmit(form, {}));
      })
      .catch(err => {
        dispatch(stopSubmit(form, {_error: getMessage(err)}));
      });
  };
}

export function logOut() {
  return dispatch => {
    return axios.post('/logout')
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(logoutError());
      });
  };
}
