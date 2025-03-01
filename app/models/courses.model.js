module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define('courses', {
        course_title_id: {
            type: Sequelize.STRING,
        },
        department_id: {
            type: Sequelize.STRING,
        },
    });

    return Courses;
};
