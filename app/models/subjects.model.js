module.exports = (sequelize, Sequelize) => {
    const Subjects = sequelize.define('subjects', {
        subject_title_id: {
            type: Sequelize.STRING,
        },
        category_id: {
            type: Sequelize.STRING,
        },
    });

    return Subjects;
};
