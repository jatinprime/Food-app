//GET USER INFO

const userModel = require("../models/userModel");


const getUserController = async (req , res) => {
    try{
        //find User
        const user = await userModel.findById({_id : req.body.id}) ;
        //validation check
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
        }

        //hide password (although it is hashed but also hide it before sending to user)
        user.password = undefined

        res.status(200).send({
            success : true,
            message : "User Get Successfully",
            user,
        });
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false,
            message : "Error in Get User API",
            error
        })
    }
}

//UPDATE USER
const updateUserController = async (req , res) => {
    try{
        //find User
        const user = await userModel.findById({_id : req.body.id}) ;

        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
        }

        //update
        const {userName , address , phone} = req.body ;
        if(userName) user.userName = userName ;
        if(address) user.address = address
        if(phone) user.phone = phone

        //save the updated user
        await user.save() ;

        user.password = undefined ;
        res.status(200).send({
            success : true,
            message : "User Updated Successfully",
            user
        });

    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false,
            message : "Error in Update User API",
            error
        });
    }
}




module.exports = {getUserController , updateUserController} ;