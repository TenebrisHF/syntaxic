// Create an edit button
var edit_button = '<a class="edit-button" style="float:right;margin-right:10px;">Edit</a>';

/**
 * Removes all text selections in current window
 */
function removeTextSelection() {

  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }

}


$(document).ready(function() {

  // Highlight every code block in the document
  $('code').each(function(i, block) {

    // Highlight the block
    hljs.highlightBlock(block);

    // Prepend the button to the title class
    $(edit_button).prependTo($(block).parent().prev()).data('block', block);

  });

  /*
   * Handles the editing of code blocks
   */
  $('.edit-button').click(function() {

    // Get the associated code block
    var edit_block = $(this).data('block');

    if(!$(edit_block).hasClass('editable')) {

      // Set the code block's contenteditable attribute to true
      $(edit_block).attr('contenteditable', 'true');

      // Add the editable class to the code block (to stop expand events)
      $(edit_block).addClass('editable');

      // Expand the code block if not already
      if(!$(edit_block).hasClass('expanded')) {

        // Get the actual height of the code block
        var height = edit_block.scrollHeight;

        // Animate the max-height to the actual height
        $(edit_block).animate({maxHeight: height}, 'slow');

        // Add the expanded class to the code block
        $(edit_block).addClass('expanded');

      }

      // Change text of edit button
      $(this).empty().append('Stop Editing');

    } else {

      // Set the code block's contenteditable attribute to false
      $(edit_block).attr('contenteditable', 'false');

      // Remove the editable class
      $(edit_block).removeClass('editable');

      // Change text of edit button
      $(this).empty().append('Edit');

      // Rehighlight the code block
      hljs.highlightBlock(edit_block);

      // Animate max height to 200px (Hackforums default) - in other words, unexpand
      $(edit_block).animate({maxHeight: '200px'}, 'slow');

      // Remove the expanded class
      $(edit_block).removeClass('expanded');

    }

  });

});

/*
 * Gets options asynchronously and pass them to the expandCodeBlock handler
 */
chrome.storage.sync.get(['enable-dblclick', 'remove-textsel'], function (obj) {

  // If the expanding codeblocks option is enabled then initiate a listener
  if(obj['enable-dblclick'] === true) {
    $('code').dblclick({'remove-textsel': obj['remove-textsel']}, expandCodeBlock);
  }

});


/*
 * Handles the expanding of code blocks
 */
function expandCodeBlock(event) {

  // Remove text selection only if the user has set the option to true
  if(event.data['remove-textsel'] === true) {
    removeTextSelection();
  }

  // Check if the current code block is not being edited
  if($(this).hasClass('editable')) {
    return;
  }

  // If the code block is already expanded
  if($(this).hasClass('expanded')){

    // Animate max height to 200px (Hackforums default)
    $(this).animate({maxHeight: '200px'}, 'slow');

    // Remove the expanded class
    $(this).removeClass('expanded');

  // If the class is not expanded
  } else {

    // Get the actual height of the code block
    var height = this.scrollHeight;

    // Animate the max-height to the actual height
    $(this).animate({maxHeight: height}, 'slow');

    // Add the expanded class to the code block
    $(this).addClass('expanded');

    }
}
