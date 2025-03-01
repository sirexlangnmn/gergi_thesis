module.exports = (sequelize, Sequelize) => {
    const Departments = sequelize.define('departments', {
        title: {
            type: Sequelize.STRING,
        },
        organization_id: {
            type: Sequelize.STRING,
        },
    });

    return Departments;
};
