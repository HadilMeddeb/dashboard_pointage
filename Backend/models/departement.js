const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const DepartementSchema = new Schema({
  name:
  {
    type: String,
    required:true,
  },
  fonction:
  {
    type: String,
    required:true,
  },
  employees:[{type:Schema.Types.ObjectId,
              ref:"Employee"
  }]
 
});
module.exports= mongoose.model("Departement",DepartementSchema);