const dbProperties = require('../db.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbProperties.database, dbProperties.user, dbProperties.password, {
    host: dbProperties.host,
    dialect: dbProperties.dialect,
    operatorsAliases: false,

    pool: {
        max: dbProperties.pool.max,
        min: dbProperties.pool.min,
        acquire: dbProperties.pool.acquire,
        idle: dbProperties.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./models/User.model')(sequelize, Sequelize);
db.userInfo = require('./models/UserInfo.model')(sequelize, Sequelize);
db.group = require('./models/Group.model')(sequelize, Sequelize);
db.post = require('./models/Post.model')(sequelize, Sequelize);
db.groupsUsers = require('./models/GroupsUsers.model')(sequelize, Sequelize);

db.user.belongsTo(db.userInfo);
db.user.hasMany(db.group);
db.user.hasMany(db.post);
db.group.hasMany(db.post);
db.group.belongsToMany(db.user, { through: db.groupsUsers})


module.exports = db;