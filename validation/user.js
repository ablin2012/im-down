// register.js

const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUserInput(newData, currentData) {
  let errors = {};

  newData.username = validText(newData.username) ? newData.username : '';
  newData.email = validText(newData.email) ? newData.email : '';
  newData.password = validText(newData.password) ? newData.password : '';
  newData.password2 = validText(newData.password2) ? newData.password2 : '';

  if (!currentData || newData.username !== currentData.username) {
    if (!Validator.isLength(newData.username, { min: 2, max: 30 })) {
      errors.username = 'Username must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(newData.username)) {
      errors.username = 'Username field is required';
    }
  }

  if (!currentData || newData.email !== currentData.email) {
    if (Validator.isEmpty(newData.email)) {
      errors.email = 'Email field is required';
    }
  
    if (!Validator.isEmail(newData.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (Validator.isEmpty(newData.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(newData.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(newData.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(newData.password, newData.password2)) {
    errors.password2 = 'Passwords must match';
  }
  

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};