const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'food',
      required: true
    },
    foodPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'foodpater',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'placed'
    }
  },
  { timestamps: true }
);

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
