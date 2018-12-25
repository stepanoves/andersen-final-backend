module.exports = (sequelize, Sequelize) => {
    const UserInfo = sequelize.define('users-info', {
        name: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        surname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        specialization: {
            type: Sequelize.STRING,
        },
        position: {
            type: Sequelize.STRING,
        },
        resumeLink: {
            type: Sequelize.STRING,
            isUrl: true,
        }
    });

    return UserInfo;
};