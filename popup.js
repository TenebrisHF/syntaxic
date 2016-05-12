$(document).ready(function() {

  // Set the select input to the current chosed theme or stylesheet
  $("select").val(localStorage.getItem('stylesheet'));

  // Listen for change events coming from the select input
  $('select').on('change', function() {

    // Get selected option's value
    var stylesheet = this.value;

    // Set stylesheet in the local storage to the selected one
    localStorage.setItem('stylesheet', stylesheet);

    // Send a message (to background.js) about the theme change
    chrome.extension.sendMessage({greeting: "ChangeTheme"});
    
  });
});
