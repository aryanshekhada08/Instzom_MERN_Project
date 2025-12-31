const foodpatnermodel = require('../models/foodpatner.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function authfoodpatnermidellware(req ,res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
        message:"Unauthorized: No token provided"
        })
    }
    try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         const foodpatner = await foodpatnermodel.findById(decoded.foodpatnerId);
         if(!foodpatner){
            return res.status(401).json({
                message:"Unauthorized: Food partner not found"
            })  ;
         }  
         req.foodpatner = foodpatner;    
        next();

    }catch(err){
        return res.status(401).json({
            message:"Unauthorized: Invalid token"
        })  ;
    }
}

module.exports = {
    authfoodpatnermidellware,
}