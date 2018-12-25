module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        text: {
            type: Sequelize.STRING,
            notEmpty: true,
        }
    });

    return Post;
};