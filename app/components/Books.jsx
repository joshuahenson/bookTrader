/* eslint no-underscore-dangle: "off" */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Books = ({ books, handleClick }) => {
  return (
    <div>
      {books.map((book, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-lg-3 text-center book-results">
          <Link to={`/book/${book._id}`} onClick={() => handleClick(book)} >
            <img alt={book.title} src={book.thumbnail} />
            <h5>{book.title}</h5>
            <h6>{book.author}</h6>
          </Link>
        </div>
      ))}
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.array,
  handleClick: PropTypes.func
};

export default Books;
