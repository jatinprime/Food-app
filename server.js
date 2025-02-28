const express = require('express') ;

//rest object 
const app = express() ;

// route
app.get('/' , (req , res) => {
    return res
    .status(200)
    .send("<h1>Welcome to food app</h1>")
})

// port
const PORT = 8000 ;

//listen
app.listen(PORT , () => {
    console.log("Server Running Successfully") ;
})