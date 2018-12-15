const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateCashAccountInput(data) {
  let errors = {};

  data.accountName = !isEmpty(data.accountName) ? data.accountName : '';
  data.classification = !isEmpty(data.classification)
    ? data.classification
    : '';

  if (Validator.isEmpty(data.accountName)) {
    errors.accountName = 'Account name is required';
  }
  if (Validator.isEmpty(data.classification)) {
    errors.classification = 'Account type is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
