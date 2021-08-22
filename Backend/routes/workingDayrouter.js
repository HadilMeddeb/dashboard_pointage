const router= require('express').Router();
const workingDayController = require('../controllers/workingDayController');
const auth= require('../middlewares/auth');
const isadmin=require('../middlewares/isadmin')

//---create workingDay
router.post('/',workingDayController.createWorkingDay);
//---get workingDay by id
router.get('/:id',workingDayController.getWorkingDayById);
//---get workingDay by id and date
router.post('/getbydateandemployee',workingDayController.getWorkingDayByDate_employee);
//---delete workingDay by id
router.delete('/:id',workingDayController.deleteWorkingDay);
//---update workingDay
router.put('/:id',workingDayController.updateWorkingDay);
//---get All workingDays
router.get('/',workingDayController.getAllWorkingDays);

module.exports=router;

