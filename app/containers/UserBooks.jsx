import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import { getBooks, addSelectedBook } from '../actions/books';

const UserBooks = ({ books, params, addSelectedBook }) => {
  return <Books books={books.filter(book => book.userId === params.user)} handleClick={addSelectedBook} />;
};

// Data that needs to be called before rendering the component on the server side.
UserBooks.need = [
  getBooks
];

UserBooks.propTypes = {
  books: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  addSelectedBook: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

export default connect(mapStateToProps, { getBooks, addSelectedBook })(UserBooks);
