// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware and configurations
app.use(bodyParser.json());

// Import routes
const userRoute = require('./routes/userRoute');

// Use routes
app.use('', userRoute);

module.exports = app;
