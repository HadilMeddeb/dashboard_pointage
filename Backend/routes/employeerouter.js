const router= require('express').Router();
const employeeController = require('../controllers/employeeController');
const auth= require('../middlewares/auth');
const isadmin=require('../middlewares/isadmin')

//---create employee
router.post('/',employeeController.createEmployee);
//---get employee by id
router.get('/:id',employeeController.getEmployeeById);
//---delete employee by id
router.delete('/:id',employeeController.deleteEmployee);
//---update employee
router.put('/:id',employeeController.updateEmployee);
//---get All employees
router.get('/',employeeController.getAllEmployees);
//---authenticate
router.post('/login',employeeController.authenticate);
module.exports=router;



/*//---create employee
router.post('/',employeeController.createEmployee);
//---get employee by id
router.get('/:id',auth,employeeController.getEmployeeById);
//---delete employee by id
router.delete('/:id',auth,isadmin,employeeController.deleteEmployee);
//---update employee
router.put('/:id',auth,employeeController.updateEmployee);
//---get All employees
router.get('/',auth,isadmin,employeeController.getAllEmployees);
//---authenticate
router.post('/login',employeeController.authenticate);
module.exports=router;*/