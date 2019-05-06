var express = require("express");
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/survey", function(req,res){
    res.sendFile(path.join(__dirname, "../public/survey.html"));
})

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "../public/home.html"));
})

