import React, { PropTypes } from 'react';

const FormField = ({ input, label, name, type, meta: { touched, error } }) => (
  <div className={`form-group${touched && error ? ' has-error' : ''}`}>
    <label htmlFor={name} className="col-sm-2 control-label">{label}</label>
    <div className={`col-sm-${touched && error ? '5' : '8'}`}>
      <input {...input} className="col-sm-8 form-control" placeholder={label} type={type} id={name} />
    </div>
    {touched && error && <div className="col-sm-3 help-block">{error}</div>}
  </div>
);

FormField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default FormField;
