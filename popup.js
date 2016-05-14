$(document).ready(function() {

  // Get options
  chrome.storage.sync.get(null, function (options) {

      // Set the theme select input to the local storage value
      $('#theme').val(options.stylesheet);

      // Set the enable double-click checkbox to the local storage value
      $('#enable-dblclick').prop('checked', options['enable-dblclick']);

      // Set the remove text selection checkbox to the local storage value
      $('#remove-textsel').prop('checked', options['remove-textsel']);

  });

  // Listen for change events coming from the select input
  $('#theme').on('change', function() {

    // Get selected option's value
    var stylesheet = this.value;

    // Set stylesheet in the local storage to the selected one
    chrome.storage.sync.set({'stylesheet': stylesheet});

    // Send a message (to background.js) about the theme change
    chrome.extension.sendMessage({greeting: "ChangeTheme"});

  });

  // Listen for change events coming from the select input
  $('#enable-dblclick').on('change', function() {

    // Get selected option's value
    var checked = this.checked;

    // Set the value in the storage to match the new value
    chrome.storage.sync.set({'enable-dblclick': checked});

  });

  // Listen for change events coming from the select input
  $('#remove-textsel').on('change', function() {

    // Get selected option's value
    var checked = this.checked;

    // Set the value in the storage to match the new value
    chrome.storage.sync.set({'remove-textsel': checked});

  });


});
