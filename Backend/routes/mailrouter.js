const router= require('express').Router();
const mailController = require('../controllers/mailController');
const auth= require('../middlewares/auth');
const isadmin=require('../middlewares/isadmin')


//send mail for all
router.post('/',mailController.sendMailforAll);
//send mail for one employee
router.post('/:email',mailController.sendMailforOne);

module.exports = router;
/*
//send mail for all
router.post('/',auth,isadmin,mailController.sendMailforAll);
//send mail for one employee
router.post('/:email',auth,isadmin,mailController.sendMailforOne);

module.exports = router;
*/