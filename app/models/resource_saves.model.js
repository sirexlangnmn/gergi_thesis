module.exports = (sequelize, Sequelize) => {
    const Resource_saves = sequelize.define('resource_saves', {
        resource_id: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.STRING,
        },
    });

    return Resource_saves;
};
