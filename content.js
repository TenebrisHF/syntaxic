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

/**
 * Handles edit button click events
 * @param {Object} event
 */
function handleEditButton(event) {

  // Get the associated code block
  var edit_block = $(this).data('block');

  if(!$(edit_block).hasClass('editable')) {

    // Set the code block's contenteditable attribute to true
    $(edit_block).attr('contenteditable', 'true');

    // Add the editable class to the code block (to stop expand events)
    $(edit_block).addClass('editable');

    // Expand the code block if not already
    if(!$(edit_block).hasClass('expanded') && event.data['enable-dblclick']) {

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

    // Check if the enable highlight is true
    if(event.data['enable-highlight']) {

      // Rehighlight the code block
      hljs.highlightBlock(edit_block);

    }

    // Check if the enable double-click option is true
    if(event.data['enable-dblclick']) {

      // Animate max height to 200px (Hackforums default) - in other words, unexpand
      $(edit_block).animate({maxHeight: '200px'}, 'slow');

      // Remove the expanded class
      $(edit_block).removeClass('expanded');

    }

  }

}


/**
 * Handles the expanding of code blocks
 * @param {Object} event
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


$(document).ready(function() {

  // Get enable highlight option asynchronously
  chrome.storage.sync.get(['enable-highlight', 'enable-dblclick', 'enable-edit'], function (options) {

      $('code').each(function(i, block) {

        if(options['enable-highlight']) {
          // Highlight the block
          hljs.highlightBlock(block);
        }

        if(options['enable-edit']) {

          // Prepend the button to the title class
          $(edit_button).prependTo($(block).parent().prev()).data('block', block);

        }

      });

      $('.edit-button').click(
          {'enable-highlight': options['enable-highlight'],
          'enable-dblclick': options['enable-dblclick']},
        handleEditButton);

  });

});

// Get enable double-click and remove text selections options asynchronously
chrome.storage.sync.get(['enable-dblclick', 'remove-textsel'], function (options) {

  // If the expanding codeblocks option is enabled then initiate a listener
  if(options['enable-dblclick'] === true) {

    $('code').dblclick({'remove-textsel': options['remove-textsel']}, expandCodeBlock);

  }

});
