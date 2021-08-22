const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const User= require('./user');
const adminSchema=new Schema({
     about:
     {
         type:String,
     }

});

module.exports=User.discriminator("Admin",adminSchema);

