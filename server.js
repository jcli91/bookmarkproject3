// DEPENDENCIES
/// get .env variables
require("dotenv").config()
// pull PORT from .env, give it a default of 3000 (object destructuring)
const { PORT = 3000, DATABASE_URL } = process.env
// import express
const express = require("express")
// create application object
const app = express()
// import mongoose
const mongoose = require("mongoose")
// IMPORT MIDDLEWARE
const cors = require("cors")
const morgan = require("morgan")

// DATABASE CONNECTION

// establish connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

//MODELS

// MIDDLEWARE
app.use(cors()) // prevent cors erros, opens up access for frontend
app.use(morgan("dev")) // loggging
app.use(express.json()) // parse json bodies

// test route
app.get("/", (req, res) => {
    res.send("Hello World")
})


// SERVER LISTENER
app.listen(PORT, () => {console.log(`listening on PORT ${PORT}`)})