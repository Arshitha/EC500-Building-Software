var i;
var createdDateMap = {};
var updatedDateMap = {};
var createdAddress = {};

for(i=0;i<orgNames.length;i++)
{   
    console.log(orgNames[i])
    createdDateMap[orgNames[i]] = (data[orgNames[i]].createdDate).substr(0,10);
    //console.log(data[orgNames[i]].address.city, data[orgNames[i]].address.state, data[orgNames[i]].address.postalCode, data[orgNames[i]].address.country)
    createdAddress[orgNames[i]] = [data[orgNames[i]].address.city, data[orgNames[i]].address.state, data[orgNames[i]].address.postalCode, data[orgNames[i]].address.country];

}

function get(k) {
    return createdDateMap[k];
}