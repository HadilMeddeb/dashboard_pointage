const WorkingDay = require('../models/workingDay');
const   Employee =require('../models/employee');
const workingDay = require('../models/workingDay');
const getDate= require('../middlewares/getDate');

module.exports=
{
    //create WorkingDay
    createWorkingDay:  (req, res) => {
    WorkingDay.findOne({employee:req.body.employee,date:getDate().currentDate}).then((workingDay)=>{
          if(workingDay==null)
          {
            console.log("ggggggggggg",workingDay)
    WorkingDay.create({employee:req.body.employee,date:getDate().currentDate}, (err, work) => {
        if (err) {
          res.status(500).json({
            message: "WorkingDay not created " + err,
            data: null,
          });
        } else {

           Employee.findOneAndUpdate(
            { _id: req.body.employee},
            { $push: { workingDays: work._id } },
            (error, employee) => {
              if (error) {
                res.status(500).json({
                  message: "WorkingDay added but not pushed in Employee  ",
                  data: null,
                });
              } else {
                console.log("employee",employee)
                res.status(200).json({
                  message: "WorkingDay added and  pushed in Employee  ",
                  data: employee,
                });
              }
            }
          );
        }
      });
          }else{ 

            res.status(500).json({message:"working day already exist",data:null})}
          })
      },

   

    
    getWorkingDayById:(req,res)=>
    
    {
        WorkingDay.findById({_id:req.params.id})
        .then((WorkingDay)=>{
            res.status(200).json({
            message:"WorkingDay found successfully",
            data:WorkingDay,})})
        .catch((err)=>{
            res.status(500).json({
            message:"WorkingDay not found"+ err,
            data:null,

        })
        })
    },

    getWorkingDayByDate_employee:(req,res)=>
    {
        WorkingDay.findOne({employee:req.body.employee,date:req.body.date}).populate({path:"pointages"})
        .then((workingDay)=>{
   
            res.status(200).json({
            message:"WorkingDay found successfully",
            data:workingDay,})})
        .catch((err)=>{
            res.status(500).json({
            message:"WorkingDay not found"+ err,
            data:null,

        })
        })
    },

    updateWorkingDay:(req,res)=>
    {
      WorkingDay.findOneAndUpdate({_id:req.params.id},req.body,(err,WorkingDay)=>{
         console.log(req.params.id)
        if(err)
        {
          res.status(500).json({
           message:"WorkingDay not updated"+ err,
           data:null,
        })
        }
        else
        {

            WorkingDay.findById({_id:req.params.id})
            .then((WorkingDay)=>{res.status(200).json({
                message:"WorkingDay updated successfully",
                data:WorkingDay,})})
            .catch((err)=>{
                   res.status(500).json({
                    message:"error"+ err,
                    data:null,
            })
          
             })

        }

      });

    },

    deleteWorkingDay:(req,res)=>
    {
        WorkingDay.findByIdAndDelete({_id:req.params.id},(err,WorkingDay=>{
            if(err)
            {
              res.status(500).json({
                                    message:"error WorkingDay not  deleted"+err,
                                    data:null
                                   });
            }
            else
            {
              res.status(201).json({
                                    message:"WorkingDay deleted successfully",
                                    data:WorkingDay,                               
                                  });

            }
        }))
      
    },

    getAllWorkingDays:(req,res)=>
    {
       WorkingDay.find({}).then((WorkingDays)=>{
          if(WorkingDays.length<=0)
          {
              res.status(500).json({
                  message:"there is no WorkingDays in system ..",
                  data:"null",
              })
          }
          else
          {
              res.status(200).json({
                  message:"WorkingDays in system",
                  data:WorkingDays
              });
          }

       })

    }



}