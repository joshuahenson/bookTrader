import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getBookRequest, deleteBookRequest } from '../actions/books';
import { proposeTradeRequest } from '../actions/users';

// TODO: Finish styling
// TODO: Prevent duplicate trade proposals
const BookDetail = ({ book, userId, deleteBookRequest, proposeTradeRequest }) => {
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
            <button
type="button" className="btn btn-primary"
              onClick={() => proposeTradeRequest(book, userId)}
            >
              Propose trade
            </button>
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
  proposeTradeRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    book: state.books.bookDetail,
    userId: state.user.userId
  };
}

export default connect(mapStateToProps, { getBookRequest, deleteBookRequest, proposeTradeRequest })(BookDetail);
