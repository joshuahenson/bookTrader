import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Trades = ({ trades }) => {
  return (
    <div>
      {trades.map((trade, index) => (
        <div key={index} className="col-sm-6 col-md-4 book-results">
          <Link to={`/trade/${trade.tradeId}`}>
            {trade.books.map((book, index) => (
              <div key={index} className="col-xs-6">
                <img alt={book.title} src={book.thumbnail} />
                <h6>{book.title}</h6>
              </div>
                ))}
          </Link>
        </div>
      ))}
    </div>
  );
};

Trades.propTypes = {
  trades: PropTypes.array
};

export default Trades;
