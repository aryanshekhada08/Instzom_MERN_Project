const express = require('express');
const mongoose = require('mongoose');
const cookierParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookierParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;