chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // Fires this for every URL
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        urlContains: ''
                    },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
// Execute the content.js script
/*chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        file: ["jquery.min.js"]
    });
});*/
/*chrome.tabs.getCurrent(function(tab){
    console.log(tab.url);
}
);*/

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
});
