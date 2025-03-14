const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
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

        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        const validationForRestaurant = await restaurantModel.findById(
            restaurant
        );
        if (!validationForRestaurant) {
            return res.status(500).send({
                success: false,
                message: "Please provide valid Restaurant",
            });
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
        });

        await newFood.save();
        res.status(200).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });
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
const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "No Food items are found",
            });
        }

        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Foods API",
            error,
        });
    }
};

//GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "No Food Id Found",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food item is found",
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get Single food API",
            error,
        });
    }
};

//GET FOOD BY RESTAURANT ID
const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "No restaurant Id Found",
            });
        }
        const food = await foodModel.find({ restaurant: restaurantId });
        if (food.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Food item is found",
            });
        }
        res.status(200).send({
            success: true,
            message: "food based on Restaurant",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get Single food API",
            error,
        });
    }
};

//UPDATE FOOD ITEM
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "No Food id was found",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found",
            });
        }
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

        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            {
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
            },
            { new: true }
        );
        res.status(200).send({
            success : true , 
            message : "Successfully updated",
            updatedFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Update food API",
            error,
        });
    }
};

//DELETE FOOD
const deleteFoodController = async(req , res) => {
    try {
        const foodId = req.params.id ;
        if(!foodId){
            return res.status(404).send({
                success : false , 
                message : "Provide food id",
            })
        }
        const food = await foodModel.findById(foodId) ;
        if(!food){
            return res.status(404).send({
                success : false , 
                message : "No Food Found with id",
            })
        }
        await foodModel.findByIdAndDelete(foodId) ;
        res.status(200).send({
            success : true , 
            message : "Food Item Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In DELETE food API",
            error,
        });
    }
}

//PLACE ORDER
const placeOrderController = async (req , res) => {
    try{   
        const {cart} = req.body ;
        if(!cart){
            return res.status(500).send({
                success : false  , 
                message : "Please provide food cart or payment method"
            })
        }
        let total = 0 ;

        //calculation
        cart.map((i) => {
            total += (i.price)
        })

        const newOrder = new orderModel({
            foods : cart , 
            payment : total , 
            buyer : req.body.id
        })
        
        //creating the instance
        await newOrder.save() ;

        res.status(201).send({
            success : true , 
            message : "Order place successfully",
            newOrder
        })
    }catch(error){
        console.log(error) 
        res.status(500).send({
            success : false , 
            message : "Error in Place Order API",
            error
        })
    }
}

//CHANGE ORDER STATUS
const orderStatusController = async (req , res) => {
    try{
        const orderId = req.params.id ;
        if(!orderId){
            return res.status(404).send({
                success : false , 
                message : "Please provide valid order Id"
            })
        }
        const {status} = req.body ;
        const order = await orderModel.findByIdAndUpdate(orderId , {status : status} , {new : true})
        return res.status(200).send({
            success : true , 
            message : "Order Status Changed" 
        })
    }catch(error){
        console.log(error) 
        res.status(500).send({
            success : false , 
            message : "Error in Order Status API",
            error
        })
    }
}

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};
