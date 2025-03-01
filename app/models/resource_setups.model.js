module.exports = (sequelize, Sequelize) => {
    const Resource_setups = sequelize.define('resource_setups', {
        resource_id: {
            type: Sequelize.STRING,
        },
        category_id: {
            type: Sequelize.STRING,
        },
        subject_id: {
            type: Sequelize.STRING,
        },
        course_id: {
            type: Sequelize.STRING,
        },
        department_id: {
            type: Sequelize.STRING,
        },
    });

    return Resource_setups;
};
