const Employee = require('../models/employee');
const Departement =require ('../models/departement');
const bcrypt =require('bcrypt');
const config= require('config');
const key=config.get("jwtSecret");
const jwt= require('jsonwebtoken')

module.exports=
{
 //authentication
 authenticate: async (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing employee
    const employee = await Employee.findOne({ email });
    if (!employee) throw Error("employee does not exist");

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) throw Error("Invalid password");

    const token = jwt.sign({ id: employee._id }, key , { expiresIn: 3600 });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token : token
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
},

  createEmployee:  async(req, res) => {

    const { name, email, password ,avatar,departement,company,website,location,status,skills,bio,githubusername,experience,education,social} = req.body;
    
    if (!name|| !email||!password||!departement||!status||!skills) 
    {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
      const employee = await Employee.findOne({ email: email });

      if (employee) throw Error("employee already exists");

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error("Something went wrong hashing the password");

      const newEmployee = new Employee({
        name,
         email,
          password,
          avatar,
          departement,
          company,
          website,
          location,
          status,
          skills,
          bio,
          githubusername,
          experience,
          education,
          social,
          password: hash,
      });

      const savedEmployee = await newEmployee.save();
      if (!savedEmployee) throw Error("Something went wrong saving the user");

      
      Departement.findOneAndUpdate(
        { _id: req.body.departement},
        { $push: { employees: newEmployee._id } },
        (error, departement) => {
          if (error) {
            res.status(500).json({
              message: "employee added but not pushed in departement.. ",
              data: null,
            });
          } else {
            res.status(200).json({
              message: "employee added and  pushed in departement..  ",
              data: departement,
            });
          }
        }
      );




    } catch (e) 
    {
      res.status(400).json({ error: e.message });
    }

  
     }, 





  
  
getEmployeeById:(req,res)=>
    {
        Employee.findById({_id:req.params.id}).populate({path:"departement"})
        .then((employee)=>{
     
             if(!employee)
             {
               res.status(500).json({
                message:"Employee not found"+ err,
                data:null,
            })
             }
             else
             {
               res.status(200).json({
                message:"Employee found successfully",
                data:employee,
            })

             }
        })
        .catch((err)=>{
            es.status(404).json({
                message:"error "+ err,
            
        })
    }) },
    updateEmployee:(req,res)=>
    {
       Employee.findOneAndUpdate({_id:req.params.id},req.body,(err,employee)=>{
         
        if(err)
        {
          res.status(500).json({
           message:"Employee not updated"+ err,
           data:null,
        })
        }
        else
        {
            Employee.findById({_id:req.params.id})
            .then((employee)=>{  res.status(200).json({
                message:"Employee updated successfully",
                data:employee,
            })})
            .catch((err)=>{
                   res.status(500).json({
                    message:"error"+ err,
                     })})
      }})
    },
    deleteEmployee:(req,res)=>
    {
        Employee.findByIdAndDelete({_id:req.params.id},(err,employee)=>{
            if(err)
            {
              res.status(500).json({
                                    message:"error Employee not  deleted"+err,
                                    data:null
                                   });
            }
            else
            {
              res.status(201).json({
                                    message:"Employee deleted successfully",
                                    data:employee,                               
                                  });

            }
        });
      
      },

    getAllEmployees:(req,res)=>
    {
        Employee.find({}).populate({path:"departement"})
        .then((employees)=>{
          if(employees.length<=0)
          {
              res.status(500).json({
                  message:"there is no Employees in system ..",
                  data:"null",
              })
          }
          else
          {
              res.status(200).json({
                  message:"Employees in system",
                  data:employees
              });
          }

       })
       .catch((err)=>{
        res.status(404).json({
            message:"error "+err
       })

    })
 }
}
