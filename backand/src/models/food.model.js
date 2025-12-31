const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Vedio:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    foodPartnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foodpartner',
        required:true
    }
},{     
    timestamps:true
})

const foodModel = mongoose.model('food',foodSchema);
module.exports = foodModel;