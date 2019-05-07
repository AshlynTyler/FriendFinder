var express = require("express");
var app = express();
var friends = require("../data/friends.js")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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