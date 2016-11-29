import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import { getBooks, addSelectedBook } from '../actions/books';

const AllBooks = ({ books, addSelectedBook }) => {
  return <Books books={books} handleClick={addSelectedBook} />;
};

// Data that needs to be called before rendering the component on the server side.
AllBooks.need = [
  getBooks
];

AllBooks.propTypes = {
  books: PropTypes.array.isRequired,
  addSelectedBook: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

export default connect(mapStateToProps, { getBooks, addSelectedBook })(AllBooks);
