module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
        },
        mobile_number: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        user_type: {
            type: Sequelize.STRING,
        },
        remember_token: {
            type: Sequelize.STRING,
        },
        organization_id: {
            type: Sequelize.STRING,
        }
    });

    return Users;
};
