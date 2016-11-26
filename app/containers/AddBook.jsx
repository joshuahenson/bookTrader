import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormField from '../components/FormField';
import { findBookRequest } from '../actions/books';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  return errors;
};
// TODO: split this up ?
// TODO: Finish searchResults.map
let AddBook = ({ handleSubmit, submitting, findBookRequest, searchResults }) => {
  return (
    <div>
      <h2 className="text-center">Add a book</h2>
      <div className="row">
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
          <div key={index}>
            {book.title}
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

export default connect(mapStateToProps, { findBookRequest })(AddBook);
