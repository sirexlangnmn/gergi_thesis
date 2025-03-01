module.exports = (sequelize, Sequelize) => {
    const Authors = sequelize.define('authors', {
        resource_id: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
    });

    return Authors;
};
