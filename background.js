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

/**
 * Listens for navigation commitment events
 */
chrome.webNavigation.onCommitted.addListener(function(details) {

  // Check if a stylesheet is already is set or not
  if(localStorage.getItem('stylesheet') === null) {
    localStorage.setItem('stylesheet', 'styles/agate.css');
  }

  // Get the stylesheet from the local storage
  var stylesheet = localStorage.getItem('stylesheet');

  // Insert stylesheet into tab
  insertCSS(details.tabId, stylesheet);
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

        // Get the stylesheet from the local storage
        var stylesheet = localStorage.getItem('stylesheet');

        // Insert stylesheet into tab
        insertCSS(tabId, stylesheet);
      }
    });
  }
});
