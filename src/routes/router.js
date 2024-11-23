const express = require('express');
const app = express();

const IndexController = require('../controllers/index.controller');

app.get('/', IndexController.index);

module.exports = app;