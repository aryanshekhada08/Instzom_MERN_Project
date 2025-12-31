const foodModel = require('../models/food.model');


async function createfood(req,res){

    console.log("req.foodpatner:", req.foodpatner);
    console.log("req.body:", req.body);
    res.send("create food endpoint");
}

module.exports = {
    createfood,
}