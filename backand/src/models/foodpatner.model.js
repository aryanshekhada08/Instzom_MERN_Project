const mongoose = require('mongoose');

const foodpatnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true   
    }
})

const foodpatnermodel = mongoose.model('foodpater', foodpatnerSchema);
module.exports = foodpatnermodel; 