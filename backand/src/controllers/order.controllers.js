const orderModel = require('../models/order.model');
const foodModel = require('../models/food.model');

async function createOrder(req, res) {
  try {
    const { foodId, quantity = 1 } = req.body;

    if (!foodId) {
      return res.status(400).json({
        message: 'foodId is required'
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({
        message: 'Food not found'
      });
    }

    const qty = Number(quantity) || 1;
    if (qty < 1) {
      return res.status(400).json({
        message: 'Quantity must be at least 1'
      });
    }

    const totalPrice = Number(food.price) * qty;

    const order = await orderModel.create({
      userId: req.user._id,
      foodId: food._id,
      foodPartnerId: food.foodPartnerId,
      quantity: qty,
      totalPrice
    });

    return res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await orderModel
      .find({ userId: req.user._id })
      .populate('foodId', 'name price Video description')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Orders fetched successfully',
      orders
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}

module.exports = {
  createOrder,
  getMyOrders
};
