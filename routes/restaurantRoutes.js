const express = require('express') ;

const { verifyJWT } = require('../middlewares/authMiddleware');
const { createRestaurantController } = require('../controllers/restaurantController');

const router = express.Router() ;
// console.log({ createRestaurantController });
//routes
//CREATE RESTAURANT || POST
router.post('/create' , verifyJWT , createRestaurantController)



module.exports = router ;