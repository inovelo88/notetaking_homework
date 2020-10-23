const express = require("express");
var uuid = require("uuid");
var fs = require("fs");
var db = require("./db/db.json");
var path = require("path");


// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET//
app.get("/api/notes", function (req, res){
    console.log("Get Notes")
    
// Reading the db.json file and returning data in the response variable
    fs.readFile("./db/db.json", "utf8", function (err, response) {
        if (err) {
            console.log(err);
        }
        console.log(response);
        // Converting the response into a JSON object
        let allNotes = JSON.parse(response)
        // Rendering the allNotes data
        res.json(allNotes);
    })
  
});
//HTML routes//

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

})
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));

})



//POST//
app.post("/api/notes", function (req, res){
    var note = req.body;
    note.id = uuid
    fs.readFile("./db/db.json", "utf8", function (err, response) {
        if (err) {
            console.log(err);
        }
        console.log(response);
        // Converting the response into a JSON object
        let allNotes = JSON.parse(response)
        //Adding new note to existing note list//
        allNotes.push(note)
        console.log("Combine List")
        WriteToDb(allNotes)
    })

})

//DELETE//
app.delete('/api/notes/:id', function (req, res){
    var id = req.params.id;
    for (let i = 0; i , db.length; i++) {
        if (db[i].id == id) {
            db.splice(i, 1);
            WriteToDb(db);
            res.json(db);
            break;        }
    }
})

// //Write to db.json//
function WriteToDb(array){
    fs.writeFileSync("./db/db.json", JSON.stringify(array));
}

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));