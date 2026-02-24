const foodpatnermodel = require('../models/foodpatner.model');
const usermodel = require('../models/user.model');
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
const authusermidellware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: "Unauthorized: No token provided" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await usermodel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ 
                message: "Unauthorized: User not found" 
            });
        }

        req.user = user;
        
        next();
        
    } catch (err) {
        console.error("Auth Middleware Error:", err.message);
        return res.status(401).json({ 
            message: "Unauthorized: Invalid or expired token" 
        });
    }
};


module.exports = {
    authfoodpatnermidellware,
    authusermidellware,
}
