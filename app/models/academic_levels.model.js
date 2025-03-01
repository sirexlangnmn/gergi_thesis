module.exports = (sequelize, Sequelize) => {
    const Academic_levels = sequelize.define('academic_levels', {
        year_level: {
            type: Sequelize.STRING,
        },
        semester: {
            type: Sequelize.STRING,
        },
        course_id: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.STRING,
        }
    });

    return Academic_levels;
};
