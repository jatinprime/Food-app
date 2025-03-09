const foodModel = require("../models/foodModel");

//CREATE FOOD
const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;

        if(!title || !description || !price || !restaurant){
            return res.status(500).send({
                success : false , 
                message : "Please provide all fields" ,
            })
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        }) ;

        await newFood.save() ;
        res.status(200).send({
            success : true , 
            message : "New Food Item Created",
            newFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Food API Create",
            error,
        });
    }
};

module.exports = { createFoodController };
