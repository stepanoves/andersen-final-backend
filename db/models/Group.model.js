module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('groups', {
        title: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
    });

    return Group;
};