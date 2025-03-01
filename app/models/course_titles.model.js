module.exports = (sequelize, Sequelize) => {
    const Course_titles = sequelize.define('course_titles', {
        title: {
            type: Sequelize.STRING,
        },
    });

    return Course_titles;
};
