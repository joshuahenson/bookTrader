import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions/books';

const Books = ({ books }) => {
  return (
    <div>
      {books.map((book, index) => {
        return (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3 text-center book-results">
            <img alt={book.title} src={book.thumbnail} />
            <h5>{book.title}</h5>
            <h6>{book.author}</h6>
          </div>
        );
      })}
    </div>
  );
};

// Data that needs to be called before rendering the component on the server side.
Books.need = [
  getBooks
];

Books.propTypes = {
  books: PropTypes.array
};

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

export default connect(mapStateToProps, { getBooks })(Books);
