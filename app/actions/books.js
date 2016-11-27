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

export function displayBookSearch(results) {
  return {
    type: types.DISPLAY_BOOK_SEARCH,
    results
  };
}

export function findBookRequest(title) {
  return (dispatch) => {
    return axios.post('/findBook', { title })
      .then(res => dispatch(displayBookSearch(res.data.results)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function addBook(id) {
  return {
    type: types.ADD_BOOK,
    id
  };
}

export function addBookRequest(thumbnail, title, author, userId, bookId) {
  return (dispatch) => {
    return axios.post('/addBook', { thumbnail, title, author, userId })
      .then(dispatch(addBook(bookId)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}
