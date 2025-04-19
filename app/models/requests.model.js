module.exports = (sequelize, Sequelize) => {
    const Requests = sequelize.define('requests', {
        user_id: {
            type: Sequelize.STRING,
        },
        book_title: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.STRING,
        },
        isbn: {
            type: Sequelize.STRING,
        },
        instructions: {
            type: Sequelize.STRING,
        },
    });

    return Requests;
};
