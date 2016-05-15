/*
 * Github manifest url, used for checking for updates
 */
 var manifest_url = 'https://raw.githubusercontent.com/TenebrisHF/syntaxic-chrome/master/manifest.json';

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
 * Checks for updates from the github repository
 * @param {String} manifest_url
 */
function checkForUpdates(manifest_url) {

  // Ajax request for manifest url
  $.getJSON(manifest_url, function(data){

    // Get the version from the Github repository
    latest_version = data.version;

    // Get the version currently running
    this_version = chrome.runtime.getManifest().version;

    // Check if there is a new version
    if(latest_version !== this_version) {

      alert('There is a new version available for Syntaxic. Please visit the Github repository and update.');

    }

  });

}

/*
 * Executed when extension is first installed
 */
chrome.runtime.onInstalled.addListener(function(details){

  // If the script was just installed, set default options
  if(details.reason == 'install'){

    chrome.storage.sync.set({
      'stylesheet': 'styles/agate.css',
      'enable-highlight': true,
      'enable-dblclick': true,
      'remove-textsel': true,
      'enable-edit': true,
    });

  }

});

/*
 * Listen for navigation commitment events
 */
chrome.webNavigation.onCommitted.addListener(function(details) {

  // Get the stylesheet from the storage and insert it
  chrome.storage.sync.get('stylesheet', function(options){
    insertCSS(details.tabId, options.stylesheet);
  });

});


/*
 * Listen for messages from other scripts to update stylesheet
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

chrome.alarms.create('checkForUpdates', {'periodInMinutes': 5});

chrome.alarms.onAlarm.addListener(function(alarm){

  if(alarm.name == 'checkForUpdates') {
    checkForUpdates(manifest_url);
  }

});
