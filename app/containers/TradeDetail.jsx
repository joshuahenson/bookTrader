import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const TradeDetail = ({ user, params }) => {
  const books = user.trades.filter(trade => trade.tradeId === params.tradeId)[0].books;
  const userIndex = books.map(book => book.userId).indexOf(user.userId); // Show user's book first
  const otherIndex = Number(!userIndex);
  const userBook = books[userIndex];
  const otherBook = books[otherIndex];

  // TODO: add address
  return (
    <div className="text-center">
      <p>You have traded your copy of</p>
      <div className="row vertical-align-sm">
        <div className="col-sm-5">
          <img src={userBook.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '')} alt={userBook.title} />
        </div>
        <p className="col-sm-2">
          for
        </p>
        <div className="col-sm-5">
          <img src={otherBook.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '')} alt={otherBook.title} />
        </div>
      </div>
      <div>
        Address or other info here
      </div>
    </div>
  );
};

TradeDetail.propTypes = {
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(TradeDetail);
