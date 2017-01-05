import { combineReducers } from 'redux';
import * as types from '../types';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    case types.SIGNUP_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.IS_WAITING:
      return true;
    case types.IS_NOT_WAITING:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const userName = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return '';
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.UPDATE_SUCCESS_USER:
      return action.userName;
    default:
      return state;
  }
};

const userId = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return '';
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return action.userId;
    default:
      return state;
  }
};

const submittingGoogle = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GOOGLE_LOGIN_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const email = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return '';
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.UPDATE_SUCCESS_USER:
      return action.email;
    default:
      return state;
  }
};

const picture = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return '';
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return action.picture || '';
    default:
      return state;
  }
};

const address = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return {};
    case types.LOGIN_SUCCESS_USER:
    case types.UPDATE_SUCCESS_USER:
      return action.address;
    default:
      return state;
  }
};

const requestedFrom = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return [];
    case types.LOGIN_SUCCESS_USER:
      return action.requestedFrom;
    case types.PROPOSE_TRADE:
      return [...state, action.book];
    case types.CANCEL_PROPOSAL:
      return state.filter(book => action.bookId !== book._id);
    default:
      return state;
  }
};

const requestedBy = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return [];
    case types.LOGIN_SUCCESS_USER:
      return action.requestedBy;
    case types.ACCEPT_TRADE:
    case types.DENY_TRADE:
      return state.filter(trade => action.tradeId !== trade.tradeId);
    case types.DELETE_BOOK:
      return state.filter(trade => trade._id !== action.id);
    default:
      return state;
  }
};

const trades = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return [];
    case types.LOGIN_SUCCESS_USER:
      return action.trades;
    case types.ACCEPT_TRADE:
      return [...state, action.trade];
    default:
      return state;
  }
};

const userReducer = combineReducers({
  authenticated,
  isLogin,
  isWaiting,
  submittingGoogle,
  userId,
  userName,
  email,
  picture,
  address,
  requestedFrom,
  requestedBy,
  trades
});

export default userReducer;
