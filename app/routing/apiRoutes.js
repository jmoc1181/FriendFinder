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
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

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


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------


  /*app.post("/api/tables", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    if (friends.length < 5) {
      friends.push(req.body);
      res.json(true);
    }
    
  });*/


};

