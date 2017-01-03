import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Books = ({ books, handleClick, requestedBy, findTrade, denyTradeRequest }) => {
  return (
    <div>
      {books.map((book, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-lg-3 text-center book-results">
          <Link to={`/book/${book._id}`} onClick={() => handleClick(book)} >
            <img alt={book.title} src={book.thumbnail} />
            <h6>{book.title}</h6>
          </Link>
          {requestedBy &&
            <div>
              <Link
                to={`/books/${book.requestorId}`}
                onClick={() => findTrade(book)} className="btn btn-default btn-sm" style={{ margin: 2 }}
              >
                Find a trade
              </Link>
              <button
                type="button" className="btn btn-danger btn-sm" style={{ margin: 2 }}
                onClick={() => denyTradeRequest(book.tradeId, book.requestorId)}
              >
                Deny trade
              </button>
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
  findTrade: PropTypes.func,
  denyTradeRequest: PropTypes.func,
  requestedBy: PropTypes.bool
};

export default Books;
