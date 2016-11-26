import * as types from '../types';

const books = (state = [], action) => {
  switch (action.type) {
    case types.ADD_BOOKS :
      return action.books;
    default:
      return state;
  }
};

export default books;
