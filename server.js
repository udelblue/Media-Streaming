'use strict';

const chalk = require('chalk');
const express = require("express");
var app = express();
const path = require('path');
const api = require('./controllers/api');
const home = require('./controllers/home');
const port =  8080;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', home);
app.use('/api', api);

app.listen(port, function () {
  console.log(chalk.yellow("Running at Port " + port ));
  console.log(chalk.green('Press CTRL-C to stop'));
});
