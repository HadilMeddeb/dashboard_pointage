//initialistaion de serveur / seance 1------
const express= require('express');
const morgan=require('morgan');
const cors = require('cors');
const app= express();
const userRouter= require('./routes/userrouter');
const adminRouter= require('./routes/adminrouter');
const employeeRouter= require('./routes/employeerouter');
const departementRouter= require('./routes/departementrouter');
const postRouter= require('./routes/postrouter');
const mailRouter= require('./routes/mailrouter');
const pointageRouter= require('./routes/pointagerouter');
const workingDayRouter= require('./routes/workingDayrouter');
const connect = require('./config/db.js');
const cron =require('node-cron');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan());
app.use(cors());
app.use('/admins',adminRouter);
app.use('/employees',employeeRouter);
app.use('/users',userRouter);
app.use('/departements',departementRouter);
app.use('/posts',postRouter);
app.use('/mail',mailRouter);
app.use('/pointages',pointageRouter);
app.use('/workingDays',workingDayRouter);


cron.schedule('0 1 * * * *',()=>{
   console.log("heyyy")
});

app.listen(4000,()=>{
                     console.log("server is listening");
                    });
    