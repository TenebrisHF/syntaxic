/**
 * Inserts a CSS stylesheet into given tab
 * @param {Number} tabId
 * @param {Number} stylesheet
 */
function insertCSS(tabId, stylesheet) {
  chrome.tabs.insertCSS(tabId, {
      file: stylesheet,
      allFrames: false
  });
}

/*
 * Executed when extension is first installed
 */
chrome.runtime.onInstalled.addListener(function(details){

  // If the script was just installed, set default options
  if(details.reason == "install"){

    chrome.storage.sync.set({
      'stylesheet': 'styles/agate.css',
      'enable-dblclick': true,
      'remove-textsel': true
    });

  }

});

/**
 * Listens for navigation commitment events
 */
chrome.webNavigation.onCommitted.addListener(function(details) {

  // Get the stylesheet from the storage and insert it
  chrome.storage.sync.get('stylesheet', function(options){
    insertCSS(details.tabId, options.stylesheet);
  });

});


/**
 * Listens for messages from other scripts to update stylesheet
 */
chrome.extension.onMessage.addListener(function(request,sender,sendResponse) {

  // Validate the request greeting
  if(request.greeting === 'ChangeTheme')
  {

    // Get current active tabs
    chrome.tabs.query({currentWindow: true, active:true},function(tabs){

      // Check if the tabs array length is not 0
      if(tabs.length !== 0) {

        // Get the first tab's ID
        tabId = tabs[0].id;

        // Get the stylesheet from the storage and insert it
        chrome.storage.sync.get('stylesheet', function(options){
          insertCSS(tabId, options.stylesheet);
        });

      }
    });
  }
});
