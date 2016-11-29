import { combineReducers } from 'redux';
import * as types from '../types';

const allBooks = (state = [], action) => {
  switch (action.type) {
    case types.ADD_BOOKS:
      return action.books;
    default:
      return state;
  }
};

const updateSearchResults = (state, action) => {
  switch (action.type) {
    case types.ADD_BOOK:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        added: true
      };
    default:
      return state;
  }
};

const searchResults = (state = [], action) => {
  switch (action.type) {
    case types.DISPLAY_BOOK_SEARCH:
      return action.results;
    case types.ADD_BOOK:
      return state.map(result => updateSearchResults(result, action));
    default:
      return state;
  }
};

const bookDetail = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_SELECTED_BOOK:
      return action.book;
    default:
      return state;
  }
};

const books = combineReducers({
  allBooks,
  searchResults,
  bookDetail
});

export default books;
