const express = require('express');
const bodyParser = require('body-parser');
const errorHandlers = require('./errorHandlers');
const routes = require('./routes');

const app = express();

const Headers = [
  ['Access-Control-Allow-Origin', '*'],
  ['Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'],
  ['Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept']
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   Headers.forEach(([value, key]) => res.setHeader(key, value));
//   next();
// });

app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

module.exports = app;
