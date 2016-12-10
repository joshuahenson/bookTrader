import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GoogleLogin from './GoogleLogin';
import FormField from '../components/FormField';
import { manualLogin, toggleLoginMode } from '../actions/users';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

let Login = ({ handleSubmit, submitting, toggleLoginMode, manualLogin }) => {
  return (
    <div>
      <div className="text-center">
        <h2>Log in with Email</h2>
        <div>
          If you don&apos;t yet have an account. &nbsp;
          <a tabIndex="0" onClick={toggleLoginMode}>
            Register Here
          </a>
        </div>
      </div>
      <form className="form-horizontal" onSubmit={handleSubmit(values => manualLogin(values, 'login'))}>
        <Field name="email" type="email" component={FormField} label="Email" />
        <Field name="password" type="password" component={FormField} label="Password" />
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={submitting}>
            {submitting ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-sign-in" />} Log In
          </button>
        </div>
        <hr />
        <GoogleLogin />
      </form>
    </div>
  );
};


Login.propTypes = {
  manualLogin: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

Login = reduxForm({
  form: 'login',
  validate
})(Login);

export default connect(null, { manualLogin, toggleLoginMode })(Login);
