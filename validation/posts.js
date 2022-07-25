const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = validText(data.text) ? data.text : '';

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    data.type = validText(data.type) ? data.type : '';

    
    if (!Validator.isIn(data.type, ['update', 'complete', 'create', 'participate'])) {
        errors.type = 'Post type is not valid';
    }
    
    if (Validator.isEmpty(data.type)) {
        errors.type = 'Type field is required';
    } 

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};