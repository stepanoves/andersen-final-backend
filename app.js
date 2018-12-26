const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbORMConfig');
const {userRouter} = require('./routes/UserRouter');
const {userInfoRouter} = require('./routes/UserInfoRouter');
const {groupRouter} = require('./routes/GroupRouter');
const {postRouter} = require('./routes/PostRouter');


const app = express();

db.sequelize.sync({force: false});

app.use(bodyParser.json());
app.use('/users', userRouter.getRoutes());
app.use('/usersinfo', userInfoRouter.getRoutes());
app.use('/groups', groupRouter.getRoutes());
app.use('/posts', postRouter.getRoutes());

app.listen('3000', () => console.log('Start'));