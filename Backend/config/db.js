//set up  mongoose connection
const mongoose= require('mongoose');
const config= require('config');
const mongodb= config.get('mongoURI');


mongoose.connect(mongodb,{ useUnifiedTopology:true,useNewUrlParser: true,useFindAndModify:true},()=>{console.log("connected on 4000 ..")});
mongoose.Promise=global.Promise;
module.exports= mongoose;



