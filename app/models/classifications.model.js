module.exports = (sequelize, Sequelize) => {
    const Classifications = sequelize.define('classifications', {
        title: {
            type: Sequelize.STRING,
        },
    });

    return Classifications;
};
