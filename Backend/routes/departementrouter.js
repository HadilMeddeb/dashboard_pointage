const router= require('express').Router();
const DepartementController = require('../controllers/DepartementController');
const auth= require('../middlewares/auth');
const isadmin=require('../middlewares/isadmin')



//---create departement
router.post('/',DepartementController.createDepartement);
//---delete departement by id
router.delete('/:id',DepartementController.deleteDepartement);
//---get departement by id
router.get('/:id',DepartementController.getDepartementById);
//---update departement
router.put('/:id',DepartementController.updateDepartement);
//---get All departements
router.get('/',DepartementController.getAllDepartements);

module.exports=router;
/*
//---create departement
router.post('/',auth,isadmin,DepartementController.createDepartement);
//---delete departement by id
router.delete('/:id',auth,isadmin,DepartementController.deleteDepartement);
//---get departement by id
router.get('/:id',auth,isadmin,DepartementController.getDepartementById);
//---update departement
router.put('/:id',auth,isadmin,DepartementController.updateDepartement);
//---get All departements
router.get('/',auth,isadmin,DepartementController.getAllDepartements);

module.exports=router;*/