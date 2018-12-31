const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const session = require('express-session');
const MySQLStore = require('connect-mysql')(session);
const dbProperties = require('./db.json');
const {groupController} = require('./controllers/GroupController');
const db = require('./db/dbORMConfig');
const {userRouter} = require('./routes/UserRouter');
const {userInfoRouter} = require('./routes/UserInfoRouter');
const {groupRouter} = require('./routes/GroupRouter');
const {postRouter} = require('./routes/PostRouter');
const {authRouter} = require('./routes/AuthRouter');
const app = express();
const expressWs = require('express-ws')(app);

options = {
    pool: true,
    config: {
        user: dbProperties.user,
        password: dbProperties.password,
        database: dbProperties.database
    }
};

db.sequelize.sync({force: false});

app.use(cors({origin: [
    "http://localhost:4200"
], credentials: true}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: dbProperties.secret,
    store: new MySQLStore(options)
}))

app.use('/users', userRouter.getRoutes());
app.use('/usersinfo', userInfoRouter.getRoutes());
app.use('/groups', groupRouter.getRoutes());
app.use('/posts', postRouter.getRoutes());
app.use('/auth', authRouter.getRoutes());


app.listen('3000', () => console.log('Start'));