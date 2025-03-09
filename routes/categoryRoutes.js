const express = require('express') ;

const {verifyJWT} = require("../middlewares/authMiddleware") ;
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");

const router = express.Router() ;

//Routes
//Create Category
router.post("/create" , verifyJWT , createCategoryController) ;

//GET ALL CATEGORY
router.get("/getAll" , getAllCategoryController) ;

//UPDATE CATEGORY
router.put("/update/:id" , verifyJWT , updateCategoryController) ;

//DELETE CATEGORY
router.delete("/delete/:id" , verifyJWT , deleteCategoryController)

module.exports = router ;