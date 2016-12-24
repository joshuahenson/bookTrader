import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Trades = ({ trades }) => {
  return (
    <div>
      {trades.map((trade, index) => (
        <div key={index} className="col-sm-6 col-md-4">
          <Link to={`/trade/${trade.tradeId}`}>
            {trade.books.map((book, index) => (
              <div key={index} className="col-xs-6">
                <img alt={book.title} src={book.thumbnail} />
                <h5>{book.title}</h5>
                <h6>{book.author}</h6>
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
