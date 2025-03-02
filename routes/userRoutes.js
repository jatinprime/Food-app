const express = require('express') ;
const { getUserController } = require('../controllers/userController');
const { verifyJWT } = require('../middlewares/authMiddleware');



const router = express.Router() ;

//routes
//GET USER || GET
router.get('/getUser' , verifyJWT , getUserController)

module.exports = router ;