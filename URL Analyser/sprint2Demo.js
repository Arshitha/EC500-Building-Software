var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var listURL = new Array()
listURL = ["https://www.goodreads.com/quotes", "http://www.primaryobjects.com/2012/11/19/parsing-hostname-and-domain-from-a-url-with-javascript/", "https://www.hackerrank.com/dashboard"]

const { URL } = require('url');

for (i =0; i<listURL.length; i++){
    const myURL = new URL(listURL[i]);
    reqURL = "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_fUkULnRdUnOFIXDmlmDyCn5Fd43Mk&domainName=" + listURL[i] +"&outputFormat=JSON"

    request(reqURL, function (error, response, body) {
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            console.log(myURL.hostname);
            console.log('Created Date:', parsedData.WhoisRecord.createdDate);
            console.log('Updated Date:', parsedData.WhoisRecord.updatedDate);
            console.log('Registrant details: ', parsedData.WhoisRecord.registrant) // Print the HTML for the Google homepage.
            console.log("##################################################################################")

        }
});
}



