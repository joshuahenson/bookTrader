import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import { getBooks } from '../actions/books';

const AllBooks = ({ books }) => {
  return <Books books={books} />;
};

// Data that needs to be called before rendering the component on the server side.
AllBooks.need = [
  getBooks
];

AllBooks.propTypes = {
  books: PropTypes.array
};

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

export default connect(mapStateToProps, { getBooks })(AllBooks);
