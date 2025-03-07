const express = require('express') ;

const {verifyJWT} = require("../middlewares/authMiddleware") ;
const { createCategoryController } = require("../controllers/categoryController");

const router = express.Router() ;

//Routes
//Create Category
router.post("/create" , verifyJWT , createCategoryController) ;

module.exports = router ;