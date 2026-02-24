const userModel  = require('../models/user.model');
const foodpatnermodel = require('../models/foodpatner.model');
const foodModel = require('../models/food.model');
const storageservice = require('../services/storage.services');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function buildPartnerProfileResponse(partnerDoc) {
  const totalMeals = await foodModel.countDocuments({ foodPartnerId: partnerDoc._id });
  const customersServed = Number(partnerDoc.customersServed) || 0;

  return {
    ...partnerDoc.toObject(),
    totalMeals,
    customersServed
  };
}

async function registerUser(req, res) {
  try {
    const { fullName, name, email, password } = req.body;
    const resolvedFullName = fullName || name;

    if (!resolvedFullName || !email || !password) {
      return res.status(400).json({ message: 'fullName, email and password are required' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new userModel({
      fullName: resolvedFullName,
      email,
      password: hashedPassword
    });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET
    );

    // Send response
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
}

async function loginUser(req, res) {
  
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const token = jwt.sign(
            { userId: user._id },
             process.env.JWT_SECRET,
          );
          res.cookie('token', token);
           res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email
            }
          });
    }
    catch(err){
        res.status(500).json({
            message:"Server error",
            error:err.message
        })
    }
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message:"Logout successful"
    });
}

async function registerfoodpanter(req, res) {

    const {name, email, password, address}= req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "name, email and password are required"
        });
    }
    try{
        const isexist = await foodpatnermodel.findOne({ email });
        if(isexist){
            return res.status(400).json({
                message:"Food patner already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newfoodpatner = await foodpatnermodel.create({
            name,
            email,
            password:hashedPassword,
            address: address || "Gujarat, India" // Save the address!
        });

        
        const token = jwt.sign(
            { foodpatnerId: newfoodpatner._id },
             process.env.JWT_SECRET,        
            );
        res.cookie('token', token);
        res.status(201).json({
            message:"Food patner registered successfully",
            token,  
            foodpatner:{
                id:newfoodpatner._id,
                name:newfoodpatner.name,
                email:newfoodpatner.email
            }      
        }); 
    }
    catch(err){
        res.status(500).json({
            message:"Server error",
            error:err.message
        })
    }
}

async function loginfoodpatner(req, res) {
  
    const {email,password} = req.body;
    try{
        const foodpatner = await foodpatnermodel.findOne({
            email
        })
        if(!foodpatner){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const isMatch = await bcrypt.compare(password,foodpatner.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const token = jwt.sign(
            { foodpatnerId: foodpatner._id },
                process.env.JWT_SECRET, 
            );
            res.cookie('token', token);

              res.status(200).json({
            message:"Login successful",
            token,
            foodpatner:{
                id:foodpatner._id,
                name:foodpatner.name,
                email:foodpatner.email
            }
          });
      }  catch(err){
        res.status(500).json({
            message:"Server error",
            error:err.message
        })
    }
 } 

 function logoutfoodpatner(req,res){
    res.clearCookie('token');
    res.status(200).json({
        message:"logout successful"
    })

 }
const getProfile = async (req, res) => {
  try {
    const partnerId = req.foodpatner?._id || req.foodpartner?._id;
    if (!partnerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await foodpatnermodel.findById(partnerId).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await buildPartnerProfileResponse(user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getFoodPartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await foodpatnermodel.findById(id).select('-password');

    if (!partner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }

    const response = await buildPartnerProfileResponse(partner);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateFoodPartnerProfile = async (req, res) => {
  try {
    const partnerId = req.foodpatner?._id;
    if (!partnerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const partner = await foodpatnermodel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }

    const { name, address, customersServed } = req.body;

    if (name !== undefined) partner.name = name.trim();
    if (address !== undefined) partner.address = address.trim();
    if (customersServed !== undefined) partner.customersServed = String(customersServed);

    if (req.file) {
      const fileuploadresult = await storageservice.uploadfile(req.file.buffer, uuid());
      partner.profileImage = fileuploadresult.url;
    }

    await partner.save();
    const response = await buildPartnerProfileResponse(partner);
    return res.status(200).json({
      message: 'Profile updated successfully',
      foodpatner: response
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// const logout = (req, res) => {
//   try {
//     // Clear the cookie named 'token' (or whatever you named it in Login)
//     res.clearCookie('token', {
//       httpOnly: true,
//       sameSite: 'strict', // Must match how you set the cookie
//       secure: false       // Set to true if using HTTPS
//     });

//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Logout failed" });
//   }
// };


module.exports = { 
    registerUser, 
    loginUser ,
    logoutUser, 
    registerfoodpanter, 
    loginfoodpatner,
    logoutfoodpatner,
    getProfile,
    getFoodPartnerById,
    updateFoodPartnerProfile,
    //logout
};
