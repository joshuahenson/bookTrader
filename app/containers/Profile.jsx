import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormField from '../components/FormField';
import { updateProfile } from '../actions/users';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

let Profile = ({ error, handleSubmit, submitting, updateProfile, pristine, userId }) => {
  return (
    <div>
      <div className="text-center">
        <h2>Profile</h2>
      </div>
      <form className="form-horizontal" onSubmit={handleSubmit(values => updateProfile(values, 'profile', userId))}>
        <Field name="name" type="name" component={FormField} label="Name" />
        <Field name="email" type="email" component={FormField} label="Email" />
        <div className="text-center">
          {error && <p className="bg-danger">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={pristine || submitting}>
            {submitting ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-floppy-o" />} Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

Profile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

Profile = reduxForm({
  form: 'profile',
  validate
})(Profile);

function mapStateToProps(state) {
  return {
    userId: state.user.userId,
    initialValues: { // populate form using reduxForm
      name: state.user.userName,
      email: state.user.email
    }
  };
}

export default connect(mapStateToProps, { updateProfile })(Profile);
