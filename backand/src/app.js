const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Fixed typo: 'cookier' -> 'cookie'
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.use((req, res, next) => {
  console.log("--- INCOMING REQUEST ---");
  console.log("URL:", req.url);
  console.log("Cookies Received:", req.cookies); 
  console.log("------------------------");
  next();
});

// --- CORS CONFIGURATION (Perfect) ---
const corsOptions = {
  origin: ['http://localhost:5173'], 
  credentials: true,               
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// IMPORTANT: These create the base URLs
app.use('/api/auth', authRoutes); // URLs start with /api/auth/...
app.use('/api/food', foodRoutes); // URLs start with /api/food/...

// --- START SERVER ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // You don't need this if you run this file directly