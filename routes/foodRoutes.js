const express = require("express");

const { verifyJWT } = require("../middlewares/authMiddleware");

const { createFoodController, getAllFoodsController, getSingleFoodController } = require("../controllers/foodController");

const router = express.Router();

//ROUTES
//CREATE FOOD
router.post("/create", verifyJWT, createFoodController);

//GET ALL FOOD
router.get("/getAll" , getAllFoodsController) ;

//GET SINGLE FOOD
router.get("/get/:id" , getSingleFoodController) ;

module.exports = router;
