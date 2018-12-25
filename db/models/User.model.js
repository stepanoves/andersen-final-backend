module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            isEmail: true,
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true,
        }
    });

    return User;
};