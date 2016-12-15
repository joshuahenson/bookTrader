import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Books = ({ books, handleClick, title, requestedBy }) => {
  return (
    <div>
      {books.map((book, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-lg-3 text-center book-results">
          <Link to={`/book/${book._id}`} onClick={() => handleClick(book)} >
            <img alt={book.title} src={book.thumbnail} />
            {title &&
              <div>
                <h5>{book.title}</h5>
                <h6>{book.author}</h6>
              </div>
            }
          </Link>
          {requestedBy &&
            <div>
              <Link to={`/books/${book.requestorId}`} className="btn btn-default" style={{ margin: 10 }}>
                View all user&apos;s books
              </Link>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.array,
  handleClick: PropTypes.func,
  title: PropTypes.bool,
  requestedBy: PropTypes.bool
};

export default Books;
