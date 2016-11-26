import axios from 'axios';
import { dismissMessage, generalErrorMessage } from './messages';
import * as types from '../types';

export function addBooks(books) {
  return {
    type: types.ADD_BOOKS,
    books
  };
}

export function getBooks() {
  return (dispatch) => {
    return axios.get('/getBooks')
      .then(res => dispatch(addBooks(res.data.books)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}
