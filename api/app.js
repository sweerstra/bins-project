const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandlers = require('./errorHandlers');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

module.exports = app;
