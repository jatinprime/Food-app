const express = require('express') ;
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const { verifyJWT } = require('../middlewares/authMiddleware');



const router = express.Router() ;

//routes
//GET USER || GET
router.get('/getUser' , verifyJWT , getUserController)

//UPDATE USER PROFILE
router.put('/updateUser' , verifyJWT , updateUserController) 

//UPDATE USER PASSWORD
router.post('/updatePassword' , verifyJWT , updatePasswordController)

//RESET PASSWORD
router.post('/resetPassword', verifyJWT , resetPasswordController)
 
//DELETE USER
router.delete('/deleteUser/:id' , verifyJWT , deleteProfileController)


module.exports = router ;