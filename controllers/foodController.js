const foodModel = require("../models/foodModel");
const restaurantModel = require("../models/restaurantModel");

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

        const validationForRestaurant = await restaurantModel.findById(restaurant) ;
        if(!validationForRestaurant){
            return res.status(500).send({
                success : false , 
                message : "Please provide valid Restaurant" 
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

//GET ALL FOODS
const getAllFoodsController = async (req , res) => {
    try{
        const foods = await foodModel.find({}) ;
        if(!foods){
            return res.status(404).send({
                success : false , 
                message : "No Food items are found" 
            })
        }

        res.status(200).send({
            success : true ,
            totalFoods : foods.length , 
            foods
        }) ;
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false , 
            message : "Error in Get All Foods API",
            error
        })
    }
}

//GET SINGLE FOOD
const getSingleFoodController = async (req , res) => {
    try{
        const foodId = req.params.id ;
        if(!foodId){
            return res.status(404).send({
                success : false , 
                message : "No Food Id Found" 
            })
        }
        const food = await foodModel.findById(foodId) ;
        if(!food){
            return res.status(404).send({
                success : false , 
                message : "No Food item is found" 
            })
        }
        res.status(200).send({
            success : true , 
            food ,
        }) ;
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false , 
            message : "Error In get Single food API" , 
            error
        })
    }
}

//GET FOOD BY RESTAURANT ID
const getFoodByRestaurantController = async (req , res) => {
    try{
        const restaurantId = req.params.id ;
        if(!restaurantId){
            return res.status(404).send({
                success : false , 
                message : "No restaurant Id Found" 
            })
        }
        const food = await foodModel.find({restaurant : restaurantId}) ;
        if(food.length === 0){
            return res.status(404).send({
                success : false , 
                message : "No Food item is found" 
            })
        }
        res.status(200).send({
            success : true , 
            message : "food based on Restaurant",
            food ,
        }) ;
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false , 
            message : "Error In get Single food API" , 
            error
        })
    }
}

module.exports = { createFoodController , getAllFoodsController , getSingleFoodController , getFoodByRestaurantController };
