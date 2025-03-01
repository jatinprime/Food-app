const mongoose = require('mongoose') ;

//function mongodb database connection

const connnectDb = async (req , res) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`) ;
        console.log(`Connected To Database ${mongoose.connection.host}`.white.bgCyan) ;
    } catch (error) {
        console.log("DB Connection Error".bgRed , error) ;
    }
}

module.exports = connnectDb ;