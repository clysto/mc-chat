const express = require('express');
const timeout = require('connect-timeout');
const cookieParser = require('cookie-parser');
const AV = require('leanengine');
const app = express();

require('./cloud');

app.use(timeout('15s'));
app.use(AV.express());
app.enable('trust proxy');

// HTTP 重定向
// app.use(AV.Cloud.HttpsRedirect());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
