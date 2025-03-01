module.exports = (sequelize, Sequelize) => {
    const Subject_titles = sequelize.define('subject_titles', {
        title: {
            type: Sequelize.STRING,
        },
    });

    return Subject_titles;
};
