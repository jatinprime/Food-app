const JWT = require('jsonwebtoken') ;



//now first we will decrypt that token to ensure that the person trying to access some related files is the authenticated user 

const verifyJWT = async (req , res , next) => {
    try{
        //get token from body
        const token = req.headers['authorization'].split(" ")[1] ;
        JWT.verify(token , process.env.JWT_SECRET , (err , decode) => {
            if(err){
                return res.status(401).send({
                    success : false,
                    message : "Un-Authorize User"
                });
            }else{
                //we are putting the id in the req.body so to get the info about the user through user id
                req.body.id = decode.id ;
                next() ;
            }
        })
    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success : false,
            message : "Please provide Auth Token",
            error
        })
    }
}

module.exports = {verifyJWT} ;
//if we send thinks like module.exports = {something} , then we have to use the same name while importing the things into other folder
//other you can give name according to you