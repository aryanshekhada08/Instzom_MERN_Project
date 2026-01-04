const express = require('express');
const foodController = require('../controllers/food.controllers');
const authmidell = require('../midellware/auth.midellware');
const router = express.Router();
const muilter = require('multer');
const upload = muilter({
    storage: muilter.memoryStorage(),
});

router.post('/', authmidell.authfoodpatnermidellware,upload.single("video"), foodController.createfood);

// router.get('/', authmidell.authusermidellware,foodController.getallfood);
router.get('/',  foodController.getallfood);



module.exports = router;