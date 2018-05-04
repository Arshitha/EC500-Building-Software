var express = require('express');
var output = require('./output.js')
const fs = require('fs');
//console.log(data)
var p;
var createdDateMap = {};
var updatedDateMap = {};
var createdAddress = {};

for(p=0;p<orgNames.length;p++)
{
    createdDateMap[orgNames[p]] = (data[orgNames[p]].createdDate).substr(0,10);
    //console.log(data[orgNames[i]].address.city, data[orgNames[i]].address.state, data[orgNames[i]].address.postalCode, data[orgNames[i]].address.country)
    createdAddress[orgNames[p]] = [data[orgNames[p]].address.city, data[orgNames[p]].address.state, data[orgNames[p]].address.postalCode, data[orgNames[p]].address.country];

}

function get(k) {
    return createdDateMap[k];
}	
// //#######
//var express = require('express');
var request = require('request'); 
var q = 0;
var r = 0;
var coordinates = new Array()
//#######
for(q=0; q<orgNames.length; q++){
    
    if(createdAddress[orgNames[q]][0] == undefined ){
        var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+",+"+createdAddress[orgNames[q]][1]+",+"+createdAddress[orgNames[q]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"
        
    } else if(createdAddress[orgNames[q]][1] == undefined) {
        var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[q]][0]+",+"+",+"+createdAddress[orgNames[q]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"
    }
    else if (createdAddress[orgNames[q]][2] == undefined){
        var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[q]][0]+",+"+",+"+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"        
    }
    else{
        var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[q]][0]+",+"+createdAddress[orgNames[q]][1]+",+"+createdAddress[orgNames[q]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4" 
    }
    
    request(reqURL,function (error, response, body) {
        if(!error && response.statusCode == 200){
            //console.log(typeof orgNames[j])
            var parsedData = JSON.parse(body);
            //coordinates.push(["{" + '"'+"title"+'"'+":"+ '"' +orgNames[j]+'"'+ ","+'"'+ "coords" +'"'+":"+ "["+ parsedData.results[0].geometry.location.lng +"," +parsedData.results[0].geometry.location.lat+"]"+"}"])
            coordinates.push(["["+ parsedData.results[0].geometry.location.lng +"," +parsedData.results[0].geometry.location.lat+"]"])
            
            const content = "var coordinates =" + "[" + coordinates +"]";
            fs.writeFile("coordinates.js", content, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            //console.log("The file was saved!");
            });   
        }

    });
  
}
