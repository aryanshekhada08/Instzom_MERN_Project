const express = require('express');
const { registerUser,loginUser,logoutUser,logoutfoodpatner,registerfoodpanter, loginfoodpatner} = require('../controllers/auth.controller');

const router = express.Router();
// User routes
router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.get('/user/logout',logoutUser)

// food partner routes
router.post('/foodpartner/register',registerfoodpanter);
router.post('/foodpartner/login',loginfoodpatner);
router.get('/foodpartner/logout',logoutfoodpatner)

module.exports = router;