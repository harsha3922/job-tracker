const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {

 //destructing from req.body
    const { email, password } = req.body;

  
 //missing check 
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

//user exist or not
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return res
        .status(401)
        .json({ message: "invalid credentials ,must signup" });
    }
 //password compare
    const isMatch = await bcrypt.compare(password, isUser.password);
    if(!isMatch){
        return res.status(401).json({message: "invalid credentials"
        })
    }

//token creation after login 
  const token = jwt.sign({id: isUser}, process.env.JWT_SECRET, {expiresIn: "7d"});

  res.status(200).json({
      token,
      _id: isUser._id,
      name: isUser.name,
      email: isUser.email,
    });


  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  
  }
};

module.exports = { signup, login };
