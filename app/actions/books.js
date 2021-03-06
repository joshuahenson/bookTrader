import axios from 'axios';
import { push } from 'react-router-redux';
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

export function noBooksFound() {
  return {
    type: types.NO_BOOKS_FOUND,
    message: 'No results found.'
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
      .then((res) => {
        if (res.status === 204) {
          dispatch(noBooksFound());
          setTimeout(() => {
            dispatch(dismissMessage());
          }, 3000);
        } else {
        dispatch(displayBookSearch(res.data.results));
        }
      })
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

export function addBookRequest(thumbnail, title, author, bookId) {
  return (dispatch) => {
    return axios.post('/addBook', { thumbnail, title, author })
      .then(dispatch(addBook(bookId)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function addSelectedBook(book) {
  return {
    type: types.ADD_SELECTED_BOOK,
    book
  };
}

export function getBookRequest(bookId) {
  return (dispatch) => {
    return axios.get(`/getBook/${bookId}`)
      .then(res => dispatch(addSelectedBook(res.data.book)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function deleteBook(id) {
  return {
    type: types.DELETE_BOOK,
    id
  };
}

export function deleteBookRequest(bookId) {
  return (dispatch) => {
    return axios.delete(`/getBook/${bookId}`)
    .then(() => {
      dispatch(push('/dashboard'));
      dispatch(deleteBook(bookId));
    })
    .catch(() => {
      dispatch(generalErrorMessage());
      setTimeout(() => {
        dispatch(dismissMessage());
      }, 5000);
    });
  };
}

export function findTrade(book) {
  return {
    type: types.FIND_TRADE,
    book
  };
}
