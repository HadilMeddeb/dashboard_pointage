const Pointage = require('../models/pointage');
const WorkingDay=require('../models/workingDay');
const getDate =require('../middlewares/getDate');


module.exports=
{

    //create pointage
    createpointage: (req, res) => {
      Pointage.create(req.body, (err, pointage) => {
          if (err) {
            res.status(500).json({
              message: "pointage not created " + err,
              data: null,
            });
          } else {

            WorkingDay.findOneAndUpdate(
              { employee: req.body.employee,date:getDate().currentDate},
              { $push: { pointages: pointage._id } },
              (error, workingDay) => {
                if (error) {
                  res.status(500).json({
                    message: "pointage added but not pushed in workingDay  ",
                    data: null,
                  });
                } else {
                  res.status(200).json({
                    message: "pointage added and  pushed in workingDay  ",
                    data: workingDay,
                  });
                }
              }
            );
            
            

          }
        });
      },

   

    
    getpointageById:(req,res)=>
    
    {
        Pointage.findById({_id:req.params.id})
        .then((pointage)=>{
            res.status(200).json({
            message:"pointage found successfully",
            data:pointage,})})
        .catch((err)=>{
            res.status(500).json({
            message:"pointage not found"+ err,
            data:null,

        })
        })
    },



    updatepointage:(req,res)=>
    {
      Pointage.findOneAndUpdate({_id:req.params.id},req.body,(err,pointage)=>{
         
        if(err)
        {
          res.status(500).json({
           message:"pointage not updated"+ err,
           data:null,
        })
        }
        else
        {

            Pointage.findById({_id:req.params.id})
            .then((pointage)=>{res.status(200).json({
                message:"pointage updated successfully",
                data:pointage,})})
            .catch((err)=>{
                   res.status(500).json({
                    message:"error"+ err,
                    data:null,
            })
          
             })

        }

      });

    },

    deletepointage:(req,res)=>
    {
        Pointage.findByIdAndDelete({_id:req.params.id},(err,pointage=>{
            if(err)
            {
              res.status(500).json({
                                    message:"error pointage not  deleted"+err,
                                    data:null
                                   });
            }
            else
            {
              res.status(201).json({
                                    message:"pointage deleted successfully",
                                    data:pointage,                               
                                  });

            }
        }))
      
    },

    getAllpointages:(req,res)=>
    {
       Pointage.find({}).then((pointages)=>{
          if(pointages.length<=0)
          {
              res.status(500).json({
                  message:"there is no pointages in system ..",
                  data:"null",
              })
          }
          else
          {
              res.status(200).json({
                  message:"pointages in system",
                  data:pointages
              });
          }

       })

    }



}