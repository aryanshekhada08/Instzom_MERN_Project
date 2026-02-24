const express = require('express');
const { registerUser,loginUser,getProfile,logoutfoodpatner,registerfoodpanter, loginfoodpatner, getFoodPartnerById} = require('../controllers/auth.controller');
const { authfoodpatnermidellware } = require('../midellware/auth.midellware');

const router = express.Router();
// User routes
router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
// router.post('/logout', logout);

// food partner routes
router.post('/foodpartner/register',registerfoodpanter);
router.post('/foodpartner/login',loginfoodpatner);
router.get('/foodpartner/logout',logoutfoodpatner);
router.get('/foodpartner/:id', getFoodPartnerById);
router.get('/me', authfoodpatnermidellware, getProfile);

module.exports = router;
