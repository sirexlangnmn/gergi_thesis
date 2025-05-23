module.exports = (sequelize, Sequelize) => {
    const Resources = sequelize.define('resources', {
        resource_id: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        ISBN: {
            type: Sequelize.STRING,
        },
        length: {
            type: Sequelize.STRING,
        },
        url_link: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING,
        },
        format_id: {
            type: Sequelize.TINYINT,
        },
        tags: {
            type: Sequelize.STRING,
        },
    });

    return Resources;
};
