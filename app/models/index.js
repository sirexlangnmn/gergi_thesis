const dbConfig = require('../config/db.config.js');
const sequelizeConfig = require('../config/sequelize.config.js');

let Sequelize = sequelizeConfig.Sequelize;
let sequelize = sequelizeConfig.sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.authors = require('./authors.model.js')(sequelize, Sequelize);
db.categories = require('./categories.model.js')(sequelize, Sequelize);
db.classifications = require('./classifications.model.js')(sequelize, Sequelize);
db.course_titles = require('./course_titles.model.js')(sequelize, Sequelize);
db.courses = require('./courses.model.js')(sequelize, Sequelize);
db.departments = require('./departments.model.js')(sequelize, Sequelize);
db.faculties = require('./faculties.model.js')(sequelize, Sequelize);
db.formats = require('./formats.model.js')(sequelize, Sequelize);
db.organizations = require('./organizations.model.js')(sequelize, Sequelize);
db.resource_setups = require('./resource_setups.model.js')(sequelize, Sequelize);
db.resources = require('./resources.model.js')(sequelize, Sequelize);
db.subject_titles = require('./subject_titles.model.js')(sequelize, Sequelize);
db.subjects = require('./subjects.model.js')(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);
db.academic_levels = require('./academic_levels.model.js')(sequelize, Sequelize);

module.exports = db;
