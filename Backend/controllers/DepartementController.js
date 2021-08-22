const Departement= require('../models/departement');

module.exports=
{
    createDepartement:(req,res)=>
    {
        Departement.create(req.body,(err,departement)=>{

         if(err)
         {
             res.status(500).json({
                 message:"Departement not created"+err,
                 data:null,
             });
         }
         else
         {
             res.status(201).json({
                message:"Departement created successfully",
                data:departement,
             });
         }

       });
    },
    
    getDepartementById:(req,res)=>
    
    {
        Departement.findById({_id:req.params.id},(err,departement)=>{
     
             if(!departement)
             {
               res.status(500).json({
                message:"Departement not found"+ err,
                data:null,
            })
             }
             else
             {
               res.status(200).json({
                message:"Departement found successfully",
                data:departement,
            })

             }
        })
    },
    updateDepartement:(req,res)=>
    {
        Departement.findOneAndUpdate({_id:req.params.id},req.body,(err,departement)=>{
         
        if(err)
        {
          res.status(500).json({
           message:"departement not updated"+ err,
           data:null,
        })
        }
        else
        {
            Departement.findById({_id:req.params.id},(err,departement)=>{
               
                res.status(200).json({
                    message:"departement updated successfully",
                    data:departement,
                })

            })
        }

      });

    },
    deleteDepartement:(req,res)=>
    {
        Departement.findByIdAndDelete({_id:req.params.id},(err,departement)=>{
            if(err)
            {
              res.status(500).json({
                                    message:"error departement not  deleted"+err,
                                    data:null
                                   });
            }
            else
            {
              res.status(201).json({
                                    message:"departement deleted successfully",
                                    data:departement,                               
                                  });

            }
        });
      
      },

    getAllDepartements:(req,res)=>
    {
        Departement.find({},(err,departements)=>{
          if(departements.length<=0)
          {
              res.status(500).json({
                  message:"there is no departements in system ..",
                  data:"null",
              })
          }
          else
          {
              res.status(200).json({
                  message:"departements in system",
                  data:departements
              });
          }

       })

    }
}