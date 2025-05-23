
const controller = {};

controller.resources = require('./resources.controller.js');
controller.join = require('./join.controller.js');
controller.departments = require('./departments.controller.js');
controller.users = require('./users.controller.js');
controller.courses = require('./courses.controller.js');
controller.resourceSetups = require('./resourceSetups.controller.js');
controller.resourceSaves = require('./resourceSaves.controller.js');
controller.categories = require('./categories.controller.js');
controller.organizations = require('./organizations.controller.js');
controller.requests = require('./requests.controller.js');
controller.subjects = require('./subjects.controller.js');
controller.classifications = require('./classifications.controller.js');
controller.courseTitles = require('./courseTitles.controller.js');
controller.subjectTitles = require('./subjectTitles.controller.js');

controller.webScraping = require('./webScraping.controller.js');


module.exports = controller;
