import { combineReducers } from 'redux';
import * as types from '../types';

const allBooks = (state = [], action) => {
  switch (action.type) {
    case types.ADD_BOOKS :
      return action.books;
    default:
      return state;
  }
};

const searchResults = (state = [], action) => {
  switch (action.type) {
    case types.DISPLAY_BOOK_SEARCH :
      return action.results;
    default:
      return state;
  }
};

const books = combineReducers({
  allBooks,
  searchResults
});

export default books;
