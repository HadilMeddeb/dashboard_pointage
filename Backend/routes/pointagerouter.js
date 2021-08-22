const router= require('express').Router();
const pointageController=require('../controllers/pointageController');
const auth= require('../middlewares/auth');
const isadmin=require('../middlewares/isadmin')


//---create pointage
router.post('/',pointageController.createpointage);
//---get pointage by id
router.get('/:id',pointageController.getpointageById);
//---delete pointage by id
router.delete('/:id',pointageController.deletepointage);
//---update pointage
router.put('/:id',pointageController.updatepointage);
//---get All pointages
router.get('/',pointageController.getAllpointages);

module.exports=router;

