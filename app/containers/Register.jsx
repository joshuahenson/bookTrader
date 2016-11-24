import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GoogleLogin from '../containers/GoogleLogin';
import FormField from '../components/FormField';
import { signUp, toggleLoginMode } from '../actions/users';

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
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

let Register = ({ error, handleSubmit, submitting, toggleLoginMode, signUp }) => {
  return (
    <div>
      <div className="text-center">
        <h2>Register with Email</h2>
        <div>
          Already have an account? &nbsp;
          <a tabIndex="0" onClick={toggleLoginMode}>
            Login Here
          </a>
        </div>
      </div>
      <form className="form-horizontal" onSubmit={handleSubmit(values => signUp(values, 'register'))}>
        <Field name="name" type="name" component={FormField} label="Name" />
        <Field name="email" type="email" component={FormField} label="Email" />
        <Field name="password" type="password" component={FormField} label="Password" />
        <div className="text-center">
          {error && <p className="bg-danger">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={submitting}>
            {submitting ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-pencil-square-o" />} Register
          </button>
        </div>
        <hr />
        <GoogleLogin />
      </form>
    </div>
  );
};

Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

Register = reduxForm({
  form: 'register',
  fields: [
    'email', 'password', 'name'
  ],
  validate
})(Register);

export default connect(null, { signUp, toggleLoginMode })(Register);
