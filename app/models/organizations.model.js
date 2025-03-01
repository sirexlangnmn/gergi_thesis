module.exports = (sequelize, Sequelize) => {
    const Organizations = sequelize.define('organizations', {
        title: {
            type: Sequelize.STRING,
        },
        classification_id: {
            type: Sequelize.STRING,
        },
    });

    return Organizations;
};
