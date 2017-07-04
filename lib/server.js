const path = require('path');
const express = require('express');
const Promise= require('bluebird');

/*********  MIDDLEWARES   *************/
const bodyParser = require('body-parser');

/*********  DEPENDENCIES  *************/
const app = express();
const CONSTANTS = require('./constants');
const port = process.env.PORT || 4000;
const helpers = require('./helpers');
const dbClass = require('./services/database');
const dbConfig = require('./config/db');
const db = new dbClass(dbConfig);
const mockData = require('../mock/reviews.json');

/********** DEP INIT  *****************/
db.events.on('error', err=> {
    console.error(err);
    process.exit(1);
})
db.set('Promise', Promise);
db.set('constants', CONSTANTS);
db.init();

/************  ROUTES  ****************/
const ApiRouter = require('./routes/api/route');

/************* APPLICATION ***********/
app.listen(port, () => console.log('Listen on port: ' + port));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('db', db);
app.set('mock', mockData);
app.set('constants', CONSTANTS);
app.set('helpers', helpers);

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/dist/index.html'))
})
app.use('/api', ApiRouter);


module.exports = app;