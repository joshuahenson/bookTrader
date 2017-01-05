import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import { getBooks, addSelectedBook } from '../actions/books';

const BooksContainer = ({ books, params, addSelectedBook }) => {
  if (params.user) {
    return <Books books={books.filter(book => book.userId === params.user)} handleClick={addSelectedBook} title />;
  }
  if (params.excluding) {
    return <Books books={books.filter(book => book.userId !== params.excluding)} handleClick={addSelectedBook} title />;
  }
  return <Books books={books} handleClick={addSelectedBook} title />;
};

// Data that needs to be called before rendering the component on the server side.
BooksContainer.need = [
  getBooks
];

BooksContainer.propTypes = {
  books: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  addSelectedBook: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

export default connect(mapStateToProps, { getBooks, addSelectedBook })(BooksContainer);
