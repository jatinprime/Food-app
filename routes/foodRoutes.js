const express = require("express");

const { verifyJWT } = require("../middlewares/authMiddleware");

const { createFoodController } = require("../controllers/foodController");

const router = express.Router();

//ROUTES
router.post("/create", verifyJWT, createFoodController);

module.exports = router;
