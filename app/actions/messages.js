import * as types from '../types';

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}

export function generalErrorMessage() {
  return {
    type: types.GENERAL_ERROR_MESSAGE,
    message: 'Unfortunately, an error has occurred'
  };
}
