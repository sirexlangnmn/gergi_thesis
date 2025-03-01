module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define('categories', {
        title: {
            type: Sequelize.STRING,
        },
        sub_category_id: {
            type: Sequelize.STRING,
        },
        course_id: {
            type: Sequelize.STRING,
        },
    });

    return Categories;
};
