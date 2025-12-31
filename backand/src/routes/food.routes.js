const express = require('express');
const foodController = require('../controllers/food.controllers');
const authmidell = require('../midellware/auth.midellware');
const router = express.Router();


router.post('/', authmidell.authfoodpatnermidellware, foodController.createfood);



module.exports = router;