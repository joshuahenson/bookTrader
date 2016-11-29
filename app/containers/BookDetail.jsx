import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getBookRequest } from '../actions/books';

// TODO: style and add larger image in place of thumbnail?
const BookDetail = ({ book }) => {
  return (
    <div>
      <img alt={book.title} src={book.thumbnail} />
      <h5>{book.title}</h5>
      <h6>{book.author}</h6>
    </div>
  );
};

// Data that needs to be called before rendering the component on the server side.
BookDetail.need = [params => getBookRequest.bind(null, params.bookId)()];

BookDetail.propTypes = {
  book: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    book: state.books.bookDetail
  };
}

export default connect(mapStateToProps, { getBookRequest })(BookDetail);
