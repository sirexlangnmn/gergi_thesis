
const middleware = {};

middleware.login_process = require('./validations/login_process.validations.js');
middleware.registration_v2 = require('./validations/registration_v2.validations.js');

module.exports = middleware;
