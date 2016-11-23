import * as types from '../types';

/*
 * Message store for global messages, i.e. Network messages / Redirect messages
 * that need to be communicated on the page itself. Ideally
 * messages/notifications should appear within the component to give the user
 * more context. - My 2 cents.
 */
export default function message(state = {
  message: '',
  type: ''
}, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {...state, message: action.message, type: 'success'};
    case types.DISMISS_MESSAGE:
      return {...state, message: '', type: ''};
    case types.LOGOUT_ERROR_USER:
    case types.GENERAL_ERROR_MESSAGE:
      return {...state, message: action.message, type: 'danger'};
    default:
      return state;
  }
}
