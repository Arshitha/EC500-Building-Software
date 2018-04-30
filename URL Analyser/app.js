var express = require('express')
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var app = express();
var i = 0 

var sessionURL = new Array()


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    //res.send("Welcome to the homepage!")
    res.render("home")
})

//routes are just bits of code that'll run some other code depending on
// the request made to the server

app.get("/fallinlove/:thing",function(req, res){
    var thing = req.params.thing
    res.render("love", {thingVar: thing})
})

const bodyParser = require("body-parser");
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/log", function (req, res) {
    //console.log(req.body)
    i = i + 1
    sessionURL = req.body.action
    console.log(sessionURL)

    ///////////////////////////////////////////////////////////////////////////////////////

    var url = "mongodb://localhost:27017/"

    MongoClient.connect(url, function(err, db) {
      if(err){return console.dir(err);}
      
      //creates a new collection
      var dbase = db.db("URL_Analyser");
      dbase.createCollection("posts", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();   //close method has also been moved to client obj
      });
    
      //inserting docs to collection created
      var collection = dbase.collection("posts")
      var key = "session" + i
      var data = {}
      //console.log(sessionURL)
      data[key] = sessionURL
    
      collection.insert(data);
    
      
    });


});





app.listen(1200, function(){
    console.log("Server is listening!");
});