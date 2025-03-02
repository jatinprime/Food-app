const userModel = require("../models/userModel");
//we can use any name in place of userModel , but the best practice is to use the same name

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;

        //validation
        if (!userName || !email || !password || !address || !phone) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        //check user
        const existing = await userModel.findOne({ email: email });
        //findOne({email}) -> also valid

        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email Already Registered please login",
            });
        }

        //now everything is fine (CREATE A NEW USER)

        const user = await userModel.create({
            userName,
            email,
            password,
            address,
            phone,
        });

        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user : user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API Controller",
            error,
        });
    }
};

//LOGIN
const loginController = async (req , res) => {
    try {
        const {email , password} = req.body ;

        //Validation
        if(!email || !password){
            return res.status(500).send({
                success : false,
                message : "Please provide Email or Password",
            });
        }

        //Check for the User in the database
        const user = await userModel.findOne({email , password}) ;

        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found or Password Incorrect",
            });
        }

        res.status(200).send({
            success : true,
            message : "Login Successfully",
            user : user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error In Login API Controller",
            error
        })
    }
}

module.exports = { registerController , loginController };
