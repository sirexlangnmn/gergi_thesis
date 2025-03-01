module.exports = (sequelize, Sequelize) => {
    const Faculties = sequelize.define('faculties', {
        title: {
            type: Sequelize.STRING,
        },
        department_id: {
            type: Sequelize.STRING,
        },
    });

    return Faculties;
};
