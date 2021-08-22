const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const getDate = require('../middlewares/getDate');

const pointageSchema=new Schema({
      date:
      {
          type:String,
          default:getDate().currentDate,
      },
      time_of_Work_minutes:
      {
          type:Number,
          default:0,
      },
      employee:
      {
          type:Schema.Types.ObjectId,
          required:true,
      },
    clockIn:{
        type:Object,
    default:{
          hours: getDate().hours,
          minutes:getDate().minutes,
          seconds: getDate().seconds,
          status: true
    }
    
    }, 
    clockOut:
    {
        type:Object,
        default:{
        hours:{type:Number},
        minutes:{type:Number},
        status:false
             }
    }
  
});

module.exports=mongoose.model("Pointage",pointageSchema);

