const restaurantModel = require("../models/restaurantModel");

//CREATE RESTAURANT
const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        //validation
        if(!title || !coords){
            return res.status(500).send({
                success : false,
                message : "Please provide , title and address",
            });
        }

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })

        await newRestaurant.save() ;

        res.status(201).send({
            success : true,
            message : "New Restaurant Created Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Restaurant API",
            error,
        });
    }
};


//GET ALL RESTAURANT
const getAllRestaurantController = async (req , res) => {
    try{
        const restaurants = await restaurantModel.find({}) ;
        if(!restaurants){
            return res.status(404).send({
                success : false,
                message : "No Restaurant Available",
            });
        }
        res.status(200).send({
            success : true,
            totalCount : restaurants.length,
            restaurants,
        });
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false, 
            message : "Error in Get All Restaurant API",
            error
        }) ;
    }
}

//GET RESTAURANT BASED ON THE SPECIFIC ID
const getRestaurantByIdController = async (req , res) => {
    try{
        const restaurantId = req.params.id ;

        //Id validation
        if(!restaurantId){
            return res.status(404).send({
                success : false ,
                message : "Please Provide Restaurant ID",
            }) ;
        }

        //find restaurant
        const restaurant = await restaurantModel.findById({_id : restaurantId}) ;
        if(!restaurant){
            return res.status(404).send({
                success : false ,
                message : "No Restaurant Found",
            });
        }
        res.status(200).send({
            success : true ,
            restaurant
        })
    }catch(error){
        console.log(error) 
        res.status(500).send({
            success : false , 
            message : "Error In Get Restaurant by id API",
            error
        })
    }
}

//DELETE RESTAURANT
const deleteRestaurantController = async (req , res) => {
    try{
        const restaurantId = req.params.id ;
        //Id validation
        if(!restaurantId){
            return res.status(404).send({
                success : false,
                message : "No Restaurant Found OR Provide Restaurant Id",
            })
        }
        const restaurant = await restaurantModel.findById({_id : restaurantId}) ;
        if(!restaurant){
            return res.status(404).send({
                success : false, 
                message : "No Such Restaurant Present" 
            })
        }

        await restaurantModel.findByIdAndDelete(restaurantId) ;
        res.status(200).send({
            success : true,
            message : "Restaurant Deleted Successfully",
        }) ;
        
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false ,
            message : "Error in delete restaurant API",
            error
        })
    }
}


module.exports = { createRestaurantController , getAllRestaurantController , getRestaurantByIdController , deleteRestaurantController };
