const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateClubInput(data) {
  let errors = {};

  data.clubName = !isEmpty(data.clubName) ? data.clubName : '';

  if (Validator.isEmpty(data.clubName)) {
    errors.clubName = 'Club name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
