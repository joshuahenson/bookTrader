import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getBookRequest, deleteBookRequest } from '../actions/books';
import { proposeTradeRequest, acceptTradeRequest } from '../actions/users';

const renderTradeButton = (proposeTradeRequest, book, userId, findTrade, requestedFrom, acceptTradeRequest, address) => {
  if (findTrade.requestorId === book.userId) {
    return (
      <button
        type="button" className="btn btn-primary"
        onClick={() => acceptTradeRequest(book, findTrade, address)}>
        Accept trade
      </button>
    );
  }
  if (requestedFrom.find(title => title._id === book._id)) {
    return (
      <button type="button" className="btn btn-primary" disabled>
        Pending trade
      </button>
    );
  }
  return (
    <button type="button" className="btn btn-primary" onClick={() => proposeTradeRequest(book, userId, address)}>
      Propose trade
    </button>
  );
};

// TODO: Finish styling
// TODO: Prevent duplicate trade proposals
const BookDetail = ({ book, userId, deleteBookRequest, proposeTradeRequest, findTrade, requestedFrom, acceptTradeRequest, address }) => {
  const cover = book.thumbnail.replace('zoom=1', 'zoom=2').replace('&edge=curl', '');
  return (
    <div>
      <img alt={book.title} src={cover} />
      <h5>{book.title}</h5>
      <h6>{book.author}</h6>
      {
        userId === book.userId ?
          <button
            type="button" className="btn btn-danger"
            onClick={() => deleteBookRequest(book._id)}
          >
            Remove your book
          </button>
        :
          <div>
            <Link to={`/books/${book.userId}`} className="btn btn-default">
              View all user&apos;s books
            </Link>
            {renderTradeButton(proposeTradeRequest, book, userId, findTrade, requestedFrom, acceptTradeRequest, address)}
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
  { getBookRequest, deleteBookRequest, proposeTradeRequest, acceptTradeRequest }
)(BookDetail);
