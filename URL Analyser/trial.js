// imported npm packages
var express = require('express');
const fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var parser = require('xml2json');
const { URL } = require('url');
// a
var app     = express();

//creating a master list of urls in the current window and other variables required
var listURL = new Array()
var requiredData = {}

listURL = ["https://mail.google.com/mail/u/1/#inbox/162a63ea49953f4b","https://blog.hartleybrody.com/chrome-extension/","https://stackoverflow.com/questions/18436245/how-to-fetch-url-of-current-tab-in-my-chrome-extension-using-javascript","https://stackoverflow.com/questions/44712495/what-are-the-differences-between-page-action-and-browser-action","https://medium.freecodecamp.org/how-to-create-and-publish-a-chrome-extension-in-20-minutes-6dc8395d7153","https://muz.li/","https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/7NUUbSVkxME","https://developer.chrome.com/extensions/tabs#method-create","https://stackoverflow.com/questions/351409/how-to-append-something-to-an-array","https://www.w3schools.com/js/js_loop_for.asp","https://stackoverflow.com/questions/13591983/onclick-within-chrome-extension-not-working","https://developer.mozilla.org/en-US/docs/Web/API/URL/URL","https://stackoverflow.com/questions/2620270/what-is-the-difference-between-json-and-xml","https://www.npmjs.com/package/xmldom","https://www.npmjs.com/package/xml2js","https://www.npmjs.com/package/xml2json","https://developer.mozilla.org/en-US/docs/Web/API/Console/dir","https://whoisapi.whoisxmlapi.com/login","https://whoisapi.whoisxmlapi.com/docs"];

//loops through all of the urls in the master list
for ( var i = 0; i<listURL.length; i++){
    console.log("value " + listURL.length );
    
    const myURL = new URL(listURL[i]);
    reqURL = "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_31VwgaDS6T3zqhOyM535z4Pi2EtBe&domainName=" + listURL[i] //+"&outputFormat=JSON"
    //console.log(listURL[i])
    
    console.log(myURL.hostname);

    request(reqURL, function (error, response, body) {
        if(!error && response.statusCode == 200){
            //converts xml to json format
            var json = parser.toJson(body);
            // converts stringified json into accessible json object
            var parsedData = JSON.parse(json);
        
            var createdDate = parsedData.WhoisRecord.createdDate
            var updatedDate = parsedData.WhoisRecord.updatedDate
            var registrant = parsedData.WhoisRecord.registrant
        
            if (createdDate != undefined && updatedDate != undefined && registrant!= undefined ){
                requiredData[myURL.hostname] = {
                    "createdDate" : parsedData.WhoisRecord.createdDate,
                    "UpdatedDate": parsedData.WhoisRecord.updatedDate,
                    "Registrant":  parsedData.WhoisRecord.registrant
                }
            }
            const content = JSON.stringify(requiredData);
            
            fs.writeFile("output.json", content, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            
                console.log("The file was saved!");
            });
            console.log(requiredData)
            

        }
    });
//console.log(requiredData)
}

//console.log(requiredData)


//########################################################################################################################
//pushing the url list to the 

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { "": "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });





