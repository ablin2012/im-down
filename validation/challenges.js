const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateChallengeInput(data) {
  let errors = {};
  
  data.title = validText(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 5, max: 50 })) {
    errors.title = 'Challenge title must be between 5 and 50 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }

  data.description = validText(data.description) ? data.description : '';

  if (!Validator.isLength(data.description, { min: 5, max: 250 })) {
    errors.description = 'Challenge description must be between 5 and 140 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }

  data.category = validText(data.category) ? data.category : '';

  if (!Validator.isLength(data.category, { min: 5, max: 20 })) {
    errors.category = 'Challenge category must be between 5 and 20 characters';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'category field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};