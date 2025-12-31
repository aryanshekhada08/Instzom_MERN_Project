const userModel  = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res){
    try{
        const {fullName, email, password} = req.body;
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
         const user = new userModel.create(
            {
            fullName,
            email, 
            password: hashedPassword
           }
        );
        // In real application, hash the password before saving
        const newUser = new userModel({fullName, email, hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    }catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }

    const token = jwt.sign({
        userId: newUser._id
    }, "2a62b705891f2aae9d9585abc5010e9e8069fa90");

    res.cookie('token', token);

    res.status(201).json({
        message: 'User registered successfully', token,
        User:{
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email
        }
    });
}

module.exports = {registerUser};