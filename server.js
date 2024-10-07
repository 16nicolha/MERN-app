//load env variables
if (process.env.NODE_ENV != "production"){
require("dotenv").config();
}

//import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");

//create an express app
const app = express();

//Connect to database
connectToDb();

//routing
app.get('/', (req, res) => {
    res.json({hello: "world"})
});

//start our server
app.listen(process.env.PORT);