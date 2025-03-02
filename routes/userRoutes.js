const express = require('express') ;
const { getUserController, updateUserController } = require('../controllers/userController');
const { verifyJWT } = require('../middlewares/authMiddleware');



const router = express.Router() ;

//routes
//GET USER || GET
router.get('/getUser' , verifyJWT , getUserController)

//UPDATE USER PROFILE
router.put('/updateUser' , verifyJWT , updateUserController) 
 
module.exports = router ;