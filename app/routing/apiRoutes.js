// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var path = require("path");
var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests

  app.get("/api/tables", function(req, res) {
    res.json(friends);
  });



app.post("/api/tables", function(req,res) {
    var rawFriend = req.body;
    var rawScore = rawFriend.scores
    var numScore = [];
    var matches = [];
    for(i=0; i<rawScore.length;i++) {
      numScore.push(parseInt(rawScore[i]));
    }

    console.log(numScore);



totalDiff = 0;
    for(i=0; i<friends.length; i++) {
      console.log(friends[i].scores);
      console.log(numScore);
        for(j=0; j<friends[i].scores.length; j++) {
            diffScore = Math.abs(friends[i].scores[j] - numScore[j]);
          
          console.log(diffScore);
          totalDiff += diffScore

        }

      matches.push({
        name: friends[i].name,
        photo: friends[i].photo,
        totaldiff: totalDiff});
        console.log(totalDiff);
        totalDiff = 0
        }

       console.log(matches);
       matches.sort(function(a,b) {
      return a.totaldiff - b.totaldiff;
       });


    match = JSON.stringify(matches[0]);
    res.json(match);

});


 

};

