//load env variables
if (process.env.NODE_ENV != "production"){
require("dotenv").config();
}

//import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require ("./models/note")

//create an express app
const app = express();

//configure express app
app.use(express.json());

//Connect to database
connectToDb();

//routing
app.get("/", (req, res) => {
    res.json({hello: "world"})
});

app.get("/notes", async (req, res) => {
    //find the notes
    const notes = await Note.find();
    //Respond with them
    res.json({ notes: notes });
});

app.get("/notes/:id", async (req, res) => {
    //Get id off the url
    const noteId = req.params.id;
    //Find the note using that id
    const note = await Note.findById(noteId)
    //Respond with the note
    res.json({ note: note })
})

app.post('/notes', async (req, res) => {
    //Get the sent in data off request body
   const title =  req.body.title;
   const body = req.body.body;
    //Create a note with it
    const note = await Note.create({
        title: title,
        body: body,
    });
    //respond with the new note
    res.json({ note: note });
})

app.put("/notes/:id", async (req, res) => {
    //Get the id off the url
    const noteId = req.params.id;
    // Get the data off the req body
    const title = req.body.title;
    const body = req.body.body;
    //Find and update the record
    const note = Note.findByIdAndUpdate(noteId, {})
    //Respond with it
    res.json ({ note: note });
})

//start our server
app.listen(process.env.PORT);