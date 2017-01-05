import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getBookRequest, deleteBookRequest } from '../actions/books';
import { proposeTradeRequest, acceptTradeRequest, cancelProposalRequest } from '../actions/users';

const renderTradeButton = (proposeTradeRequest, book, userId, findTrade, requestedFrom, acceptTradeRequest, address, cancelProposalRequest) => {
  if (findTrade.requestorId === book.userId) {
    return (
      <button
        type="button" className="btn btn-primary" style={{ margin: 10 }}
        onClick={() => acceptTradeRequest(book, findTrade, address)}
      >
        Accept trade
      </button>
    );
  }
  if (requestedFrom.find(title => title._id === book._id)) {
    return (
      <button
        type="button" className="btn btn-danger" style={{ margin: 10 }}
        onClick={() => cancelProposalRequest(book._id, book.userId)}
      >
        Cancel proposed trade
      </button>
    );
  }
  return (
    <button
      type="button" className="btn btn-primary" style={{ margin: 10 }}
      onClick={() => proposeTradeRequest(book, address)}
    >
      Propose trade
    </button>
  );
};

const BookDetail = ({ book, userId, deleteBookRequest, proposeTradeRequest, findTrade, requestedFrom, acceptTradeRequest, address, cancelProposalRequest }) => {
  const cover = book.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '');
  return (
    <div className="text-center">
      <img alt={book.title} src={cover} />
      <h5>{book.title}</h5>
      <h6>{book.author}</h6>
      {
        userId === book.userId ?
          <button
            type="button" className="btn btn-danger" style={{ margin: 10 }}
            onClick={() => deleteBookRequest(book._id)}
          >
            Remove your book
          </button>
        :
          <div>
            <Link to={`/books/${book.userId}`} className="btn btn-default" style={{ margin: 10 }}>
              View all user&apos;s books
            </Link>
            {userId && renderTradeButton(proposeTradeRequest, book, userId, findTrade, requestedFrom, acceptTradeRequest, address, cancelProposalRequest)}
          </div>
      }
    </div>
  );
};

// Data that needs to be called before rendering the component on the server side.
BookDetail.need = [params => getBookRequest.bind(null, params.bookId)()];

BookDetail.propTypes = {
  book: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  deleteBookRequest: PropTypes.func.isRequired,
  proposeTradeRequest: PropTypes.func.isRequired,
  acceptTradeRequest: PropTypes.func.isRequired,
  cancelProposalRequest: PropTypes.func.isRequired,
  findTrade: PropTypes.object.isRequired,
  requestedFrom: PropTypes.array.isRequired,
  address: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    book: state.books.bookDetail,
    userId: state.user.userId,
    findTrade: state.books.findTrade,
    requestedFrom: state.user.requestedFrom,
    address: state.user.address
  };
}

export default connect(
  mapStateToProps,
  { getBookRequest, deleteBookRequest, proposeTradeRequest, acceptTradeRequest, cancelProposalRequest }
)(BookDetail);
