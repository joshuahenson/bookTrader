import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import { getBooks } from '../actions/books';

const UserBooks = ({ books, params }) => {
  return <Books books={books.filter(book => book.userId === params.user)} />;
};

// Data that needs to be called before rendering the component on the server side.
UserBooks.need = [
  getBooks
];

UserBooks.propTypes = {
  books: PropTypes.array.required,
  params: PropTypes.object.required
};

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

export default connect(mapStateToProps, { getBooks })(UserBooks);
