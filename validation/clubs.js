const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateClubInput(data) {
  let errors = {};

  data.clubName = !isEmpty(data.clubName) ? data.clubName : '';
  data.objective = !isEmpty(data.objective) ? data.objective : '';

  if (Validator.isEmpty(data.clubName)) {
    errors.clubName = 'Club name is required';
  }
  if (Validator.isEmpty(data.objective)) {
    errors.objective = 'Club objective is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
