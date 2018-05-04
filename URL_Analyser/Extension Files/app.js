//required libraries
var express = require('express')
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var app = express();
const fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var parser = require('xml2json');
const { URL } = require('url');

//global variables
var i = 0 
var sessionURL = new Array()
//variables from sprint3demo.js
var requiredData = {}
var organizations = new Array()
var j =0; //counter variable


app.use(express.static("public"));
app.set("view engine", "ejs");



//routes are just bits of code that'll run some other code depending on
// the request made to the server

app.get("/",function(req,res){
    //res.send("Welcome to the homepage!")
    res.render("home")
})

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
    //console.log(sessionURL)

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

    //NOT doing it from database 
    //NEED TO CHANGE THIS TO PULL DATA FROM DATABASE
    var listURL = sessionURL
    console.log(listURL)

    //CODE FROM sprint3demo.js
    for (j = 0; j<listURL.length; j++){
    
        //const myURL = new URL(listURL[j]);
        const myURL = new URL(listURL[j]);
        
        reqURL = "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_Bn4ROUo0Erl3CRjNsrQS2IkPOWCSq&domainName=" + listURL[j] //+"&outputFormat=JSON"
        //console.log(listURL[j])
    
        request(reqURL, function (error, response, body) {
            //console.log(organizations[j] + " value is " + j)
            if(!error && response.statusCode == 200){
                //converts xml to json format
                var json = parser.toJson(body);
                // converts stringified json into accessible json object
                var parsedData = JSON.parse(json);
                
                //prints out only the required data from the json
                console.log(myURL.hostname);
                //console.log("here again"+ i)
                //console.log(parsedData.WhoisRecord.registrant)
                var createdDate = parsedData.WhoisRecord.createdDate
                var updatedDate = parsedData.WhoisRecord.updatedDate
                var registrant = parsedData.WhoisRecord.registrant
                //var currOrganization = parsedData.WhoisRecord.registrant.organization
    
                console.log('Created Date:', createdDate);
                console.log('Updated Date:', updatedDate);
                console.log('Registrant details: ', registrant) // Print the HTML for the Google homepage.
                console.log("##################################################################################")
            
                if (createdDate != undefined && updatedDate != undefined && registrant!= undefined ){
                    requiredData[myURL.hostname] = {
                        "createdDate" : parsedData.WhoisRecord.createdDate,
                        "UpdatedDate": parsedData.WhoisRecord.updatedDate,
                        "address":  {
                            "city":parsedData.WhoisRecord.registrant.city,
                            "state":parsedData.WhoisRecord.registrant.state,
                            "postalCode":parsedData.WhoisRecord.registrant.postalCode,
                            "country": parsedData.WhoisRecord.registrant.country
                        }
                    }
                    organizations.push("'"+myURL.hostname+"'")
                    //console.log(organizations)
    
                }
                //console.log(requiredData)
                const content = "data =" + JSON.stringify(requiredData)+"\n"+"orgNames =" + "[" +
                organizations+"]";
                fs.writeFile("output.js", content, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                
                    console.log("The file was saved!");
                });
                //console.log(requiredData)
                
    
            }
        });
        
    }




});






// //CODE FROM req.js
// var output = require('./output.js')
// var p; //change variable name
// var createdDateMap = {};
// var updatedDateMap = {};
// var createdAddress = {};


// for(p=0;p<orgNames.length;p++)
// {
//     createdDateMap[orgNames[p]] = (data[orgNames[p]].createdDate).substr(0,10);
//     //console.log(data[orgNames[i]].address.city, data[orgNames[i]].address.state, data[orgNames[i]].address.postalCode, data[orgNames[i]].address.country)
//     createdAddress[orgNames[p]] = [data[orgNames[p]].address.city, data[orgNames[p]].address.state, data[orgNames[p]].address.postalCode, data[orgNames[p]].address.country];

// }

// function get(k) {
//     return createdDateMap[k];
// }

// var q = 0;
// var r = 0;
// var coordinates = new Array()

// for(q=0; q<orgNames.length; q++){
    
//     if(createdAddress[orgNames[q]][0] == undefined ){
//         var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+",+"+createdAddress[orgNames[q]][1]+",+"+createdAddress[orgNames[q]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"
        
//     } else if(createdAddress[orgNames[q]][1] == undefined) {
//         var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[q]][0]+",+"+",+"+createdAddress[orgNames[q]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"
//     }
//     else if (createdAddress[orgNames[q]][2] == undefined){
//         var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[q]][0]+",+"+",+"+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"        
//     }
//     else{
//         var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[q]][0]+",+"+createdAddress[orgNames[q]][1]+",+"+createdAddress[orgNames[q]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4" 
//     }
    
//     request(reqURL,function (error, response, body) {
//         if(!error && response.statusCode == 200){
//             //console.log(typeof orgNames[j])
//             var parsedData = JSON.parse(body);
//             //coordinates.push(["{" + '"'+"title"+'"'+":"+ '"' +orgNames[j]+'"'+ ","+'"'+ "coords" +'"'+":"+ "["+ parsedData.results[0].geometry.location.lng +"," +parsedData.results[0].geometry.location.lat+"]"+"}"])
//             coordinates.push(["["+ parsedData.results[0].geometry.location.lng +"," +parsedData.results[0].geometry.location.lat+"]"])
            
            
//             const content = "coordinates =" + "[" + coordinates +"]";
//             fs.writeFile("coordinates.js", content, 'utf8', function (err) {
//             if (err) {
//                 return console.log(err);
//             }
    
//             console.log("The file was saved!");
//             });   
//         }

//     });
    
    
// }

app.listen(1200, function(){
    console.log("Server is listening!");
});