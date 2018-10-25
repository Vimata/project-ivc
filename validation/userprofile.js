const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateUserProfileInput(data) {
  let errors = {};

  data.role = !isEmpty(data.role) ? data.role : '';
  data.objective = !isEmpty(data.objective) ? data.objective : '';

  if (Validator.isEmpty(data.role)) {
    errors.role = 'Role is required';
  }
  if (Validator.isEmpty(data.objective)) {
    errors.objective = 'Objective is required';
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
