//////////////////////////////////
// Dependencies
/////////////////////////////////
// get .env variables
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


/////////////////////////////////
// Database Connection
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to Mongo"))
.on("close", () => console.log("You are disconnected from Mongo"))
.on("error", (error) => console.log(error))


//////////////////////////////
// Models
//////////////////////////////
// The Bookmarks Schema
const BookmarksSchema = new mongoose.Schema({
    name: String,
    url: String
}, {timestamps: true})

const Bookmarks = mongoose.model("Bookmarks", BookmarksSchema)


/////////////////////////////////
// Middleware
//////////////////////////////////
app.use(cors()) // prevent cors errors, opens up access for frontend
app.use(morgan("dev")) // loggging
app.use(express.json()) // parse json bodies


////////////////////////////////
// Routes
////////////////////////////////
// Test Route
app.get("/", (req, res) => {
    res.send("Hello World")
})

// Index Route
// get request to /bookmarks, returns all bookmarks as json
app.get("/bookmarks", async (req, res) => {
    try {
      // send all bookmarks
      res.json(await Bookmarks.find({}));
    } catch (error) {
      res.status(400).json({ error });
    }
});

// Create Route
// post request to /bookmarks, uses request body to make new bookmark
app.post("/bookmarks", async (req, res) => {
    try {
      // create a new bookmark
      res.json(await Bookmarks.create(req.body));
    } catch (error) {
      res.status(400).json({ error });
    }
});

// Update Route
// put request /bookmarks/:id, updates bookmarks based on id with request body
app.put("/bookmarks/:id", async (req, res) => {
    try {
        // update a bookmark
        res.json(await Bookmarks.findByIdAndUpdate(req.params.id, req.body, {new: true}));
      } catch (error) {
        res.status(400).json({ error });
      }
})

// Destroy Route 
// delete request to /bookmarks/:id, deletes the bookmark specified
app.delete("/bookmarks/:id", async (req, res) => {
    try {
        // delete a bookmark
        res.json(await Bookmarks.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json({ error });
      }
})


/////////////////////////////////
// Server Listener
/////////////////////////////////
app.listen(PORT, () => {console.log(`listening on PORT ${PORT}`)})