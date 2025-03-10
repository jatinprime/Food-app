const express = require("express");

const { verifyJWT } = require("../middlewares/authMiddleware");

const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController } = require("../controllers/foodController");

const router = express.Router();

//ROUTES
//CREATE FOOD
router.post("/create", verifyJWT, createFoodController);

//GET ALL FOOD
router.get("/getAll" , getAllFoodsController) ;

//GET SINGLE FOOD
router.get("/get/:id" , getSingleFoodController) ; 

//GET FOOD BY RESTAURANT
router.get("/getByRestaurant/:id" , getFoodByRestaurantController) ;

//UPDATE FOOD 
router.put("/update/:id" , verifyJWT , updateFoodController)

//DELETE FOOD 
router.delete("/delete/:id" , verifyJWT , deleteFoodController)

//PLACE ORDER
router.post("/placeorder" , verifyJWT , placeOrderController)


module.exports = router;
