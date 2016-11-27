import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormField from '../components/FormField';
import { findBookRequest, addBookRequest } from '../actions/books';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  return errors;
};

// TODO: Generalize wording about title or add multiple fields for different search types
// TODO: split this up ?
let AddBook = ({ handleSubmit, submitting, findBookRequest, searchResults, addBookRequest, userId }) => {
  return (
    <div>
      <h2 className="text-center">Add a book</h2>
      <div className="row show-grid">
        <p className="col-sm-8 col-sm-offset-2">Enter a title to add your book to the collection</p>
      </div>
      <form className="form-horizontal" onSubmit={handleSubmit(value => findBookRequest(value.title))}>
        <Field name="title" type="text" component={FormField} label="Book Title" />
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={submitting}>
            {submitting ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-search" />} Search
          </button>
        </div>
      </form>
      {searchResults.map((book, index) => {
        return (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3 text-center book-results">
            <button
              type="button"
              className={`btn btn-circle ${book.added ? 'btn-success' : 'btn-primary'}`}
              disabled={book.added}
              onClick={() => addBookRequest(
                  book.thumbnail, book.title, (book.authors ? book.authors.join(', ') : ''), userId, book.id
                )
              }
            >+</button>
            <img src={book.thumbnail} alt={book.title} />
            <h5>{book.title}</h5>
            {book.authors ? <h6>{book.authors.join(', ')}</h6> : null}
          </div>
        );
      })}
    </div>
  );
};


AddBook.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  findBookRequest: PropTypes.func.isRequired,
  addBookRequest: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    searchResults: state.books.searchResults,
    userId: state.user.userId
  };
}

AddBook = reduxForm({
  form: 'addBook',
  validate
})(AddBook);

export default connect(mapStateToProps, { findBookRequest, addBookRequest })(AddBook);
