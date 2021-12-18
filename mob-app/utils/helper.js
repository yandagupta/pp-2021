const validator = require('validator');

export default class Helper {
    static isEmailValid(email) {
        return validator.isEmail(email);
    }
}