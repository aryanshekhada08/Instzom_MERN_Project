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
router.get('/my', authmidell.authfoodpatnermidellware, foodController.getMyFoods);
router.get('/user/:id', foodController.getFoodsByPartner);
router.put('/:id', authmidell.authfoodpatnermidellware, upload.single("video"), foodController.updateFood);
router.delete('/:id', authmidell.authfoodpatnermidellware, foodController.deleteFood);



module.exports = router;
