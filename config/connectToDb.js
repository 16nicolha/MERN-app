//load env variables
if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
    }

const mongoose = require('mongoose');

async function connectToDb(){
    await mongoose.connect(process.env.DB_URL);
}

module.exports = connectToDb;