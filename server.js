const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");



//dotenv config
//we do not require path , as server.js is already present in the root directory with .env file , so no need to give path in dotenv.confi
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use('/api/v1/test' , require('./routes/testRoutes.js')) ;   //it is not much important to write .js after testRoutes (but it becomes important when we are using import export methods)

// route
app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome to food app</h1>");
});

// port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
    console.log(`Server Running Successfully on ${PORT}`.white.bgMagenta);
});
