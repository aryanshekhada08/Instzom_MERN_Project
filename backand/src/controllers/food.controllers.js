const foodModel = require('../models/food.model');
const storageservice = require('../services/storage.services');
const { v4: uuid } = require('uuid');


async function createfood(req, res) {

    const fileuploadresult = await storageservice.uploadfile(req.file.buffer, uuid());

    const newfood = await foodModel.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        Video: fileuploadresult.url,
        foodPartnerId: req.foodpatner._id,
    })
    res.status(201).json({
        message: "food created successfully",
        food: newfood
    })
}

async function getallfood(req, res) {
    const foods = await foodModel.find();
    res.status(200).json({
        message: "All foods fetched successfully",
        foods
    });
}

async function getFoodsByPartner(req, res) {
    try {
        const { id } = req.params;
        const foods = await foodModel.find({ foodPartnerId: id });
        return res.status(200).json({
            message: "Partner foods fetched successfully",
            foods
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    createfood,
    getallfood,
    getFoodsByPartner,
}
