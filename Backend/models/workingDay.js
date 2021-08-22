const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const workingDaySchema=new Schema({
      date:
      {
          type:String,
          required:true,
      },
      time_of_Work:
      {
          type:Number,
          default:0,
      },
      validation:
      {
        type:Object,
        default:{ 
                 validated:false,
                 temps_manquant:8
                }
      },

      employee:
      {
          type:Schema.Types.ObjectId,
          required:true,
      },

      pointages:[
          {
              type:Schema.Types.ObjectId,
              ref:"Pointage"
          }
      ]
});
module.exports=mongoose.model("WorkingDay",workingDaySchema);

