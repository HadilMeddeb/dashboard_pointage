//http://localhost:5000/api/
//users/
//http methods post , put , delete

const express = require('express');
const router= express.Router();
// et Router ya9ra  el path mte3 les requetes http
const userController = require('../controllers/userController');
//---create user
router.post("/",userController.createuser);
//---get user by id
router.get("/:id",userController.getUserById);
//--- update user
router.put("/:id",userController.updateUser);
//---delete user
router.delete("/:id",userController.deleteUser);
//---getAllUsers
router.get('/',userController.getAllUsers);
//---authenticate
router.post('/login',userController.authenticate);

module.exports= router;