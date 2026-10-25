const bcrypt = require("bcrypt")
const UserModel = require("../models/user");


const signup = async(req,res) =>{

    try{
           const{name, email, password} = req.body;
    

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password : hashedPassword
        });
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
         })

    }
    catch(error){
      console.log(error.message);
      res.status(500).json({ message: "Server error" });


    }
}


module.exports = { signup };