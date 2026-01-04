const express = require('express');
const mongoose = require('mongoose');
const cookierParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cookierParser());
app.use(cors({
  Credentials: true,
  origin: ['http://localhost:5173']
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;