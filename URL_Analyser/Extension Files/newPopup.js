
var listURL = new Array();

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getAllTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    //active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    //var tab = tabs[0];
    for (var i = 0; i < tabs.length; i++) { 
        listURL.push(tabs[i].url)
        // format html
        var html = '<li><a href=' + listURL[i]+ " target='_blank'>" + listURL[i] + '</a><br/></li>';

        document.getElementById("div").innerHTML = "<h2>Current Session Pages</h2>";

        var list = document.getElementById("list");
        var newcontent = document.createElement('LI');
        newcontent.innerHTML = html;

        while (newcontent.firstChild) {
            list.appendChild(newcontent.firstChild);
        }
    }

    //console.log(listURL[0])
    //#################################################################################################
    // format html
    //var html = '<li><a href=' + listURL[0]+ " target='_blank'>" + listURL[0] + '</a><br/></li>';

    // change the text message
    //document.getElementById("div").innerHTML = "<h2>Saved pages</h2>";

    // get to unordered list and create space for new list item 
    //var list = document.getElementById("list");
    //var newcontent = document.createElement('LI');
    //newcontent.innerHTML = html;

    // while loop to remember previous content and append the new ones

    //while (newcontent.firstChild) {
    //    list.appendChild(newcontent.firstChild);
    //}

    //#################################################################################################
    

    

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    //var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    
    //console.log(url)
    //console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(listURL);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}


// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', () => {
  getAllTabUrl((url) => {
    console.log(listURL)
  });

  // function toObject(listURL) {
  //   var listObj = {};
  //   for (var i = 0; i < listURL.length; ++i)
  //     listObj[i] = arr[i];
  //   return listObj;
  // }
  
  //var listURL = toObject(listURL)

  $(document).ready(function(){
    $('body').on('click', 'a', function(){
      chrome.tabs.create({url: $(this).attr('href')});
    return false;
    });
  });

  var test = "testing"
  function sendingList(){
    xj.open("POST", "http://localhost:1200/log", true);
    //console.log("here 1")
    //xj.setRequestHeader("Content-Type", "application/text");
    //console.log("here 2")
    xj.setRequestHeader("Content-Type", "application/json");
    xj.send(JSON.stringify({ action: listURL}));
    //console.log("here 3")
    xj.onreadystatechange = function () { if (xj.readyState == 4 && xj.status == 200) { console.log("something's happening"); console.log(xj.responseText); } else{console.log("unsucessful")} }
    //console.log("here 4s")
    
  }

  function sendingList2(){
    $.ajax({
      type: "POST",
      url: "http://localhost:1200/log",
        data: JSON.stringify({'action': listURL}),
        dataType: "json",
        cache: false, 
        contentType: "application/json",
    });
  }
  
  $(document).ready(function(){
    // $('#auth').on('click',function(){console.log()})
    $('#save_button').on('click', sendingList2)
  });
// chrome.storage.sync.set({"List URLs": listURL}, function() {
//   console.log('Value is set to ' + listURL);
// });
// key = "List URLs"
// chrome.storage.sync.get([key], function(result) {
//   console.log('Value currently is ' + result.key);
// });

});


