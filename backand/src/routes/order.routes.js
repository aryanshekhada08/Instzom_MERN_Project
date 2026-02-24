const express = require('express');
const { authusermidellware } = require('../midellware/auth.midellware');
const orderController = require('../controllers/order.controllers');

const router = express.Router();

router.post('/', authusermidellware, orderController.createOrder);
router.get('/my', authusermidellware, orderController.getMyOrders);

module.exports = router;
