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
        // 1. Get token from Cookies OR Authorization Header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: "Unauthorized: No token provided" 
            });
        }

        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find the user using the EXACT key from your login (foodpatnerId)
        const foodpartner = await foodpatnermodel.findById(decoded.foodpatnerId);

        if (!foodpartner) {
            return res.status(401).json({ 
                message: "Unauthorized: User not found" 
            });
        }

        // 4. Attach the user to the request object for use in your controller
        req.foodpartner = foodpartner;
        
        next(); // Move to foodController.getallfood
        
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