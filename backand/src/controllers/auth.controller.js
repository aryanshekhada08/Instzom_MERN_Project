const userModel  = require('../models/user.model');
const foodpatnermodel = require('../models/foodpatner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new userModel({
      fullName,
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
    // req.user.id comes from the cookie/token
    const user = await foodpatnermodel.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
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
    //logout
};