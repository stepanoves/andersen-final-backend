const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbORMConfig');

const app = express();

db.sequelize.sync({force: true});

app.use(bodyParser.json());

app.listen('3000', () => console.log('Start'));