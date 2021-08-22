const Admin= require ('../models/admin');
const User = require('../models/user');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');
const config= require('config');
const key=config.get("jwtSecret");

module.exports=
{
     //authentication
     authenticate: async (req, res) => {
        const { email, password } = req.body;
        // Simple validation
        if (!email || !password) {
          return res.status(400).json({ msg: "Please enter all fields" });
        }
    
        try {
          // Check for existing user
          
          const user = await User.findOne({ email ,__t:"Admin"});
          console.log("**********",user)
          if (!user) throw Error("User does not exist");
    
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) throw Error("Invalid password");
    
          const token = jwt.sign({ id: user._id },key, { expiresIn: 3600 });
          if (!token) throw Errorsr("Couldnt sign the token");
    
          res.status(200).json({
            token : token
          });
        } catch (e) {
          res.status(400).json({ msg: e.message });
        }
      },

    createAdmin: async (req, res) => {
        const { name, email, password } = req.body;
    
        if (!email || !name || !password) {
          return res.status(400).json({ message: "Please enter all fields" });
        }
    
        try {
          const user = await User.findOne({ email: email });
          if (user) throw Error(" Admin already exists");
      
          const salt = await bcrypt.genSalt(10);
     
          if (!salt) throw Error("Something went wrong with bcrypt");
    
          const hash = await bcrypt.hash(password, salt);
          if (!hash) throw Error("Something went wrong hashing the password");
    
          const newUser = new Admin({
            name,
            email,
            password: hash,
          });
    
          const savedUser = await newUser.save();
          if (!savedUser) throw Error("Something went wrong saving Admin");
    
          res.status(200).json({
            message: "user successfuly registred",
            user: savedUser,
          });
        } catch (e) {
          res.status(400).json({ error: e.message });
        }
      },
    
    }
