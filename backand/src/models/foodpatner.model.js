const mongoose = require('mongoose');

const foodpatnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // This will appear as "Business Name"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true   
    },
    // 👇 NEW FIELDS FOR PROFILE PAGE
    address: {
        type: String,
        default: "Gujarat, India" // Default address if they don't provide one
    },
    profileImage: {
        type: String,
        default: "" // URL for the round avatar image
    },
    customersServed: {
        type: String,
        default: "0" // For the "15K" stat
    }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const foodpatnermodel = mongoose.model('foodpater', foodpatnerSchema);
module.exports = foodpatnermodel;