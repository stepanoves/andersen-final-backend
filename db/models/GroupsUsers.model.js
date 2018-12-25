module.exports = (sequelize, Sequelize) => {
    const GroupsUsers = sequelize.define('groups-users', {});

    return GroupsUsers;
};