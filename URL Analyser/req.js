var orgNames = ["Free Code Camp", "w3schools", "Google LLC"];
var data =
{
	"Free Code Camp":
		{
		"createdDate":"2018-04-08 17:24:33.000 UTC",
		"updatedDate":"2018-04-08 17:24:33.000 UTC",
		"address": {
			"country":"US",
			"city":"Almeda",
			"state":"CA",
			"postalCode":"94501"
			}
		},
"w3schools":
	{
		"createdDate":"2000-03-21 17:24:33.000 UTC",
		"updatedDate":"2017-10-21 17:24:33.000 UTC",
		"address": {
			"country":"US",
			"city":"Jacksonville",
			"state":"FL",
			"postalCode":"32258"
			}
		},
"Google LLC":
	{
		"createdDate":"2018-04-08 17:24:33.000 UTC",
		"updatedDate":"2018-04-08 17:24:33.000 UTC",
		"address": {
			"country":"US",
			"city":"Mountain View",
			"state":"CA",
			"postalCode":"94043"
			}
		}
}
//#######
var i;
var createdDateMap = {};
var updatedDateMap = {};
var createdAddress = {};

for(i=0;i<orgNames.length;i++)
{
    createdDateMap[orgNames[i]] = (data[orgNames[i]].createdDate).substr(0,10);
    //console.log(data[orgNames[i]].address.city, data[orgNames[i]].address.state, data[orgNames[i]].address.postalCode, data[orgNames[i]].address.country)
    createdAddress[orgNames[i]] = [data[orgNames[i]].address.city, data[orgNames[i]].address.state, data[orgNames[i]].address.postalCode, data[orgNames[i]].address.country];

}

function get(k) {
    return createdDateMap[k];
}	

//#######
var express = require('express');
var request = require('request'); 

//#######

var reqURL= "https://maps.googleapis.com/maps/api/geocode/json?address=+"+createdAddress[orgNames[0]][0]+",+"+createdAddress[orgNames[0]][1]+",+"+createdAddress[orgNames[0]][2]+"&key=AIzaSyCj2ofMlDRfz32br1dEJ0Y1mEJ8xiq_7g4"
    request(reqURL, function (error, response, body) {
        console.log(error);
        console.log(response.statusCode)
        if(!error && response.statusCode == 200){
            //converts xml to json format
            //var json = parser.toJson(body);
            // converts stringified json into accessible json object
            var parsedData = JSON.parse(body);
            console.log(parsedData.results[0].geometry.location.lat)
            console.log(parsedData.results[0].geometry.location.lng)
            
        }
    });