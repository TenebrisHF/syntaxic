$(document).ready(function() {

  // Get options
  chrome.storage.sync.get(null, function (options) {

      // Set the theme select input to the storage value
      $('#theme').val(options.stylesheet);

      // Set the enable highlight checkbox to the storage value
      $('#enable-highlight').prop('checked', options['enable-highlight']);

      // Set the enable double-click checkbox to the storage value
      $('#enable-dblclick').prop('checked', options['enable-dblclick']);

      // Set the remove text selection checkbox to the storage value
      $('#remove-textsel').prop('checked', options['remove-textsel']);

      // Set the enable edit checkbox to the storage value
      $('#enable-edit').prop('checked', options['enable-edit']);

  });

  // Listen for change events coming from the select input
  $('#theme').on('change', function() {

    // Get selected option's value
    var stylesheet = this.value;

    // Set stylesheet in the local storage to the selected one
    chrome.storage.sync.set({'stylesheet': stylesheet});

    // Send a message (to background.js) about the theme change
    chrome.extension.sendMessage({greeting: 'ChangeTheme'});

  });

  // Listen for change events coming from enable highlight checkbox
  $('#enable-highlight').on('change', function() {

    // Get checkbox value
    var checked = this.checked;

    // Set the value in the storage to match the new value
    chrome.storage.sync.set({'enable-highlight': checked});

  });

  // Listen for change events coming from the enable dblclick checkbox
  $('#enable-dblclick').on('change', function() {

    // Get checkbox value
    var checked = this.checked;

    // Set the value in the storage to match the new value
    chrome.storage.sync.set({'enable-dblclick': checked});

  });

  // Listen for change events coming from the remove text selection checkbox
  $('#remove-textsel').on('change', function() {

    // Get checkbox value
    var checked = this.checked;

    // Set the value in the storage to match the new value
    chrome.storage.sync.set({'remove-textsel': checked});

  });

  // Listen for change events coming from the enable edit checkbox
  $('#enable-edit').on('change', function() {

    // Get checkbox value
    var checked = this.checked;

    // Set the value in the storage to match the new value
    chrome.storage.sync.set({'enable-edit': checked});

  });


});
