import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormField from '../components/FormField';
import FormField2 from '../components/FormField2';
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
  if (!values.street) {
    errors.street = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  } else if (!/^(?:A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/i.test(values.state)) {
    errors.state = 'Invalid state';
  }
  if (!values.zip) {
    errors.zip = 'Required';
  } else if (!/^([0-9]{5}(?:-[0-9]{4})?)*$/.test(values.zip)) {
    errors.zip = 'Invalid zip code';
  }
  return errors;
};

// TODO: Use object-diff to send only dirty values?
let Profile = ({ error, handleSubmit, submitting, updateProfile, pristine }) => {
  return (
    <div>
      <div className="text-center">
        <h2>Profile</h2>
      </div>
      <form className="form-horizontal" onSubmit={handleSubmit(values => updateProfile(values))}>
        <Field name="name" type="name" component={FormField} label="Name" />
        <Field name="email" type="email" component={FormField} label="Email" />
        <Field name="street" type="street" component={FormField} label="Street" />
        <Field name="city" type="city" component={FormField} label="City" />
        <div className="form-group">
          <Field name="state" type="state" component={FormField2} label="State" />
          <Field name="zip" type="zip" component={FormField2} label="Zip" />
        </div>
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
  pristine: PropTypes.bool.isRequired
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
      email: state.user.email,
      street: state.user.address.street,
      city: state.user.address.city,
      state: state.user.address.state,
      zip: state.user.address.zip,
    }
  };
}

export default connect(mapStateToProps, { updateProfile })(Profile);
