// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var apiRoutes = require("./app/routing/apiRoutes")
var htmlRoutes = require("./app/routing/htmlRoutes")
var friends = require("./app/data/friends.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/survey", function(req,res){
    res.sendFile(path.join(__dirname, "public/survey.html"));
})

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "public/home.html"));
})

app.get("/api/friends", function(req,res){
    return res.json(friends.list);
})

app.post("/api/friends", function(req,res){

    let userScores = req.body.scores;

    for(let i = 0;i < friends.list.length; i++){
        let currentFriend = friends.list[i];

        let friendScores = currentFriend.scores;

        let currentTotal = 0;

        let closestTotal = 41;

        let closestFriend;

        for(let j = 0; j < 10; j++){
            currentTotal += Math.abs(userScores[i] - friendScores[i])
        }

        if(currentTotal < closestTotal){
            closestTotal = currentTotal;

            closestFriend = currentFriend;
        }

        friends.list.push(req.body)

        return res.json(closestFriend)
    }
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  