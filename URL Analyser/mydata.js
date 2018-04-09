
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

$.getJSON("output.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});

function load() {
	var mydata = JSON.parse(output);
	alert(mydata);
	//alert(mydata);
}


	

