const testUserController = (req , res) => {
    try {
        return res
        .status(200)
        .send({
            success : true ,
            message : "TEST User Data API"
        })
    } catch (error) {
        console.log("Error in the Test API route" , error) ;
    }
};

module.exports = { testUserController };
