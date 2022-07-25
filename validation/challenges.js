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
    errors.description = 'Challenge description must be between 5 and 250 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }

  data.category = validText(data.category) ? data.category : '';

  if (!Validator.isLength(data.category, { min: 2, max: 20 })) {
    errors.category = 'Challenge category must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'category field is required';
  }

  data.startDate = validText(data.startDate) ? data.startDate : '';

  if (!Validator.isDate(data.startDate)) {
    errors.startDate = 'Invalid start date';
  }

  if (Validator.isBefore(data.startDate, new Date(new Date()- ((24+9) * 60 * 60 * 1000)).toString())) {
    errors.startDate = 'Challenge start date cannot be before today!';
  }

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = 'start date field is required';
  }

  data.endDate = validText(data.endDate) ? data.endDate : '';

  if (!Validator.isDate(data.endDate)) {
    errors.endDate = 'Invalid end date';
  }

  if (Validator.isBefore(data.endDate, new Date(data.startDate).toString())) {
    errors.endDate = 'Challenge end date cannot be before the start date!';
  }

  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = 'end date field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};