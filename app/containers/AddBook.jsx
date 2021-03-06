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

// FUTURE: add multiple fields for different search types (title, author, etc.)
// FUTURE: split this up ?
let AddBook = ({ handleSubmit, submitting, findBookRequest, searchResults, addBookRequest }) => {
  return (
    <div>
      <h2 className="text-center">Add a book</h2>
      <form className="form-horizontal" onSubmit={handleSubmit(value => findBookRequest(value.title))}>
        <Field name="title" type="text" component={FormField} label="Book Title or Author" />
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
              className={`btn btn-circle ${book.added ? 'btn-success' : 'btn-standard'}`}
              disabled={book.added}
              onClick={() => addBookRequest(
                  book.thumbnail, book.title, (book.authors ? book.authors.join(', ') : ''), book.id
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
  searchResults: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    searchResults: state.books.searchResults
  };
}

AddBook = reduxForm({
  form: 'addBook',
  validate
})(AddBook);

export default connect(mapStateToProps, { findBookRequest, addBookRequest })(AddBook);
