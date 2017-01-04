import * as types from '../types';

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}

export function generalMessage(message) {
  return {
    type: types.GENERAL_MESSAGE,
    message
  };
}

export function infoMessage(message) {
  return {
    type: types.INFO_MESSAGE,
    message
  };
}

export function errorMessage(message) {
  return {
    type: types.ERROR_MESSAGE,
    message
  };
}

export function generalErrorMessage() {
  return {
    type: types.GENERAL_ERROR_MESSAGE,
    message: 'Unfortunately, an error has occurred'
  };
}
