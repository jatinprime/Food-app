const categoryModel = require("../models/categoryModel");


//CREATE CATEGORY CONTROLLER
const createCategoryController = async (req , res) => {
    try {
        const {title , imageUrl} = req.body ;
        //validation check
        if(!title){
            return res.status(500).send({
                success : false , 
                message : "Please provide category title or image"
            })
        }
        const newCategory = new categoryModel({title , imageUrl}) ;
        await newCategory.save() ;
        res.status(201).send({
            success : true , 
            message : "Category Created",
            newCategory ,
        }) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).send({
            success : false , 
            message : "Error in create category API" ,
            error
        })
    }
}

module.exports = {createCategoryController}