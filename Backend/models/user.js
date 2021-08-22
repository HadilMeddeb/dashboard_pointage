const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const User=new Schema({
      name:
      {
          type:String,
          required:true,
      },
      email:
      {
          type:String,
          required:true,
      },
      password:
      {
          type:String,
          required:true,
      },
      avatar:
      {
          type:String,
      },
      date:{
        type :Date,
        default: Date.now
    },
    posts:
    [   
        { 
            type:Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
  

});

module.exports=mongoose.model("User",User);

