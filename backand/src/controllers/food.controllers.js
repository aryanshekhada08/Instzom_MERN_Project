const foodModel = require('../models/food.model');
const storageservice = require('../services/storage.services');
const { v4: uuid } = require('uuid');


async function createfood(req, res) {
    try {
        const { name, price, description } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({
                message: "name, price and description are required"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                message: "video file is required"
            });
        }

        const fileuploadresult = await storageservice.uploadfile(req.file.buffer, uuid());

        const newfood = await foodModel.create({
            name,
            price,
            description,
            Video: fileuploadresult.url,
            foodPartnerId: req.foodpatner._id,
        });

        return res.status(201).json({
            message: "food created successfully",
            food: newfood
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function getallfood(req, res) {
    try {
        const foods = await foodModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "All foods fetched successfully",
            foods
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function getFoodsByPartner(req, res) {
    try {
        const { id } = req.params;
        const foods = await foodModel.find({ foodPartnerId: id }).sort({ createdAt: -1 });
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

async function getMyFoods(req, res) {
    try {
        const foods = await foodModel.find({ foodPartnerId: req.foodpatner._id }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "My foods fetched successfully",
            foods
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function updateFood(req, res) {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;
        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        if (food.foodPartnerId.toString() !== req.foodpatner._id.toString()) {
            return res.status(403).json({
                message: "Forbidden: You can only edit your own food"
            });
        }

        if (name) food.name = name;
        if (description) food.description = description;
        if (price !== undefined && price !== null && price !== "") {
            food.price = price;
        }

        if (req.file) {
            const fileuploadresult = await storageservice.uploadfile(req.file.buffer, uuid());
            food.Video = fileuploadresult.url;
        }

        await food.save();
        return res.status(200).json({
            message: "Food updated successfully",
            food
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function deleteFood(req, res) {
    try {
        const { id } = req.params;
        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        if (food.foodPartnerId.toString() !== req.foodpatner._id.toString()) {
            return res.status(403).json({
                message: "Forbidden: You can only delete your own food"
            });
        }

        await foodModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Food deleted successfully"
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
    getMyFoods,
    updateFood,
    deleteFood,
}
