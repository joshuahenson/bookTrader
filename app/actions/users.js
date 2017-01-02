import axios from 'axios';
import { push } from 'react-router-redux';
import { startSubmit, stopSubmit } from 'redux-form';
import { dismissMessage, generalErrorMessage, infoMessage } from './messages';
import * as types from '../types';

const getMessage = res => res.response.data.message;

// Log In Action Creators
export function googleLogin() {
  return { type: types.GOOGLE_LOGIN_USER };
}

export function loginSuccess(message, userName, userId, email, picture, address, requestedFrom, requestedBy, trades) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    userName,
    userId,
    email,
    picture,
    address,
    requestedFrom,
    requestedBy,
    trades
  };
}

// Sign Up Action Creators
export function signUpSuccess(message, userName, userId, email) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
    userName,
    userId,
    email
  };
}

export function updateSuccess(userName, email, address) {
  return {
    type: types.UPDATE_SUCCESS_USER,
    message: 'Your profile has been updated',
    userName,
    email,
    address
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
  return (dispatch) => {
    dispatch(startSubmit(form));
    return axios.post('/login', data)
      .then((response) => {
        const { message, userName, userId, email, picture, address, requestedFrom, requestedBy, trades } = response.data;
        dispatch(loginSuccess(message, userName, userId, email, picture, address, requestedFrom, requestedBy, trades));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 3000);
        dispatch(push('/'));
        dispatch(stopSubmit(form, {}));
      })
      .catch((err) => {
        dispatch(stopSubmit(form, { _error: getMessage(err) }));
      });
  };
}

export function signUp(data, form) {
  return (dispatch) => {
    dispatch(startSubmit(form));

    return axios.post('/signup', data)
      .then((response) => {
        const { message, userName, userId, email } = response.data;
        dispatch(signUpSuccess(message, userName, userId, email));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 3000);
        dispatch(push('/'));
        dispatch(stopSubmit(form, {}));
      })
      .catch((err) => {
        dispatch(stopSubmit(form, { _error: getMessage(err) }));
      });
  };
}

// this isn't very restful
export function updateProfile(values, form) {
  return (dispatch) => {
    dispatch(startSubmit(form));
    return axios.post('/updateprofile', values)
      .then((response) => {
        const { userName, email, address } = response.data;
        dispatch(updateSuccess(userName, email, address));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 3000);
        // dispatch(push('/'));
        dispatch(stopSubmit(form, {}));
      })
      .catch((err) => {
        dispatch(stopSubmit(form, { _error: getMessage(err) }));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    return axios.post('/logout')
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(logoutError());
      });
  };
}


export function proposeTrade(book) {
  return {
    type: types.PROPOSE_TRADE,
    book
  };
}

function addressRequired() {
  return (dispatch) => {
    dispatch(push('/profile'));
    dispatch(infoMessage('Please update address first'));
    setTimeout(() => {
      dispatch(dismissMessage());
    }, 5000);
  };
}

export function proposeTradeRequest(book, address) {
  if (Object.keys(address).length === 0) {
    return addressRequired();
  }
  return (dispatch) => {
    return axios.post('/proposeTrade', { book })
      .then((res) => {
        dispatch(proposeTrade(res.data));
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log('Duplicate'); // TODO: message action if implemented
        } else {
          dispatch(generalErrorMessage());
          setTimeout(() => {
            dispatch(dismissMessage());
          }, 5000);
        }
      });
  };
}

export function acceptTrade(tradeId, trade) {
  return {
    type: types.ACCEPT_TRADE,
    tradeId,
    trade
  };
}

export function acceptTradeRequest(book, findTrade, address) {
  if (Object.keys(address).length === 0) {
    return addressRequired();
  }
  return (dispatch) => {
    dispatch(userIsWaiting());
    return axios.post('/acceptTrade', { book, findTrade })
      .then((res) => {
        dispatch(userIsNotWaiting());
        dispatch(acceptTrade(findTrade.tradeId, res.data));
        dispatch(push('/dashboard'));
      })
      .catch(() => {
        dispatch(userIsNotWaiting());
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function cancelProposal(bookId) {
  return {
    type: types.CANCEL_PROPOSAL,
    bookId
  };
}

export function cancelProposalRequest(bookId, ownerId) {
  return (dispatch) => {
    return axios.post('/cancelProposal', { bookId, ownerId })
      .then(() => {
        dispatch(cancelProposal(bookId));
        dispatch(push('/dashboard'));
      })
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function denyTrade(tradeId) {
  return {
    type: types.DENY_TRADE,
    tradeId
  };
}

export function denyTradeRequest(tradeId, requestorId) {
  return (dispatch) => {
    return axios.post('/denyTrade', { tradeId, requestorId })
      .then(() => {
        dispatch(denyTrade(tradeId));
      })
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}
