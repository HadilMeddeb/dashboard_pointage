const email = require('nodemailer');
const config = require('config');


const sender=config.get("sender");
const password= config.get("password");


const sendmail=(reciever,sub,txt)=>{
    
var transporter = email.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: password
  }
});

var op= {
  from: sender,
  to: reciever,
  subject: sub,
  text: txt
};

transporter.sendMail(op, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}
module.exports=sendmail;








