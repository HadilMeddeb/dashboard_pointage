const express= require('express');
const AdminController = require('../controllers/AdminController');
const router= express.Router();


router.post('/',AdminController.createAdmin);
router.post('/login',AdminController.authenticate);

module.exports=router;