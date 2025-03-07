const express = require('express') ;

const { verifyJWT } = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantController');

const router = express.Router() ;

// console.log({ createRestaurantController });
//routes

//CREATE RESTAURANT || POST
router.post('/create' , verifyJWT , createRestaurantController)

//GET ALL RESTAURANTS || GET
router.get("/getAll" , getAllRestaurantController)

//GET RESTAURANTS BASED ON THE SPECIFIC ID
router.get("/get/:id" , getRestaurantByIdController) 

//DELETE RESTAURANT || DELETE
router.delete("/delete/:id" , verifyJWT , deleteRestaurantController)


module.exports = router ;