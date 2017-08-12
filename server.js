
var express = require("express");
var bodyParser = require("body-parser");



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;



app.use(express.static('./app/public')); 


app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);
