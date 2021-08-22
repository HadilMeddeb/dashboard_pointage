const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
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
        const user = await User.findOne({ email });
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
    createuser:(req,res)=>
    {
       User.create(req.body,(err,user)=>{

         if(err)
         {
             res.status(500).json({
                 message:"user not created"+err,
                 data:null,
             });
         }
         else
         {
             res.status(201).json({
                message:"user created successfully",
                data:user,
             });
         }

       }); 
    },
    
    getUserById:(req,res)=>
    
    {
        User.findById({_id:req.params.id},(err,user)=>{
     
             if(!user)
             {
               res.status(500).json({
                message:"user not found"+ err,
                data:null,
            })
             }
             else
             {
               res.status(200).json({
                message:"user found successfully",
                data:user,
            })

             }
        })
    },
    updateUser:(req,res)=>
    {
      User.findOneAndUpdate({_id:req.params.id},req.body,(err,user)=>{
         
        if(err)
        {
          res.status(500).json({
           message:"user not updated"+ err,
           data:null,
        })
        }
        else
        {
          res.status(200).json({
           message:"user updated successfully",
           data:user,
       })

        }

      });

    },
    deleteUser:(req,res)=>
    {
        User.findByIdAndDelete({_id:req.params.id},(err,user)=>{
            if(err)
            {
              res.status(500).json({
                                    message:"error user not  deleted"+err,
                                    data:null
                                   });
            }
            else
            {
              res.status(201).json({
                                    message:"user deleted successfully",
                                    data:user,                               
                                  });

            }
        });
      
    },

    getAllUsers:(req,res)=>
    {
       User.find({},(err,users)=>{
          if(users.length<=0)
          {
              res.status(500).json({
                  message:"there is no users in system ..",
                  data:"null",
              })
          }
          else
          {
              res.status(200).json({
                  message:"users in system",
                  data:users
              });
          }

       })

    }



}