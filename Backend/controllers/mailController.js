
const router= require('express').Router();
const sendMail= require('../middlewares/sendmail');
const User= require('../models/user');



module.exports={

     sendMailforAll :async (req,res)=>
    {    
         emails=req.body.emails
        try{
            emails.map((email)=>sendMail(email,req.body.sub,req.body.txt));
            res.status(200).json({message:"sended .."});
       }
        catch(err)
            {
                res.status(500).json({message:"error sending message"+err});
            }
    
    },

    sendMailforOne :(req,res)=>
    {
      try
      {
         sendMail(req.params.email,req.body.sub,req.body.txt);
         res.status(500).json({message:"mail sended to "+req.params.email});
      }
      catch(err)
      {
          res.status(500).json({message:"error message not send .." +err});
      }


    },
}


