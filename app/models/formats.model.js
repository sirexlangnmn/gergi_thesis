module.exports = (sequelize, Sequelize) => {
    const Formats = sequelize.define('formats', {
        title: {
            type: Sequelize.STRING,
        },
    });

    return Formats;
};
