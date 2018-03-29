/*const { URL } = require('url');

const myURL = new URL('https://www.goodreads.com/quotes');
console.log(myURL.hostname);
//console.log(myURL.password)
// Prints example.org

//myURL.hostname = 'example.com:82';
//console.log(myURL.href);
// Prints https://example.com:81/foo

const dns = require('dns');
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.com', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6

// When options.all is true, the result will be an Array.
options.all = true;
dns.lookup('example.com', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// addresses: [{"address":"2606:2800:220:1:248:1893:25c8:1946","family":6}]

//const dns = require('dns');
dns.lookupService('93.184.216.34', 22, (err, hostname, service) => {
  console.log(hostname, service);
});

var http = require('http');

var options = {
    host: 'goodreads.com',
    path: '/quotes'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log(data);

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();

var satelize = require('satelize');
var ExternalIP = "52.94.226.87"; // I asume that, you already have external(public)IP
satelize.satelize({ip: ExtenalIP}, function(err, geoData) 
{

     if(err){
        console.log(" Error in retriving ISP Information");  
     }
     else
     {
        console.log("ISP Information for "+ ExternalIP+" :"+geoData );
     }
});*/
/*var url = "http://www.primaryobjects.com/2012/11/19/parsing-hostname-and-domain-from-a-url-with-javascript/"
function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}*/
