$(document).ready(function() {

  // Highlight every code block in the document
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});

// Listen for click events on code blocks
$('code').click(function() {

  // If the code block is already expanded
  if($(this).hasClass('expanded')){

    // Set max-height to 200px (Hackforums default)
    $(this).css('max-height', '200px');

    // Remove the expanded class
    $(this).removeClass('expanded');

  // If the class is not expanded
  }else{

    // Set the max-height to none
    $(this).css('max-height', 'none');

    // Add the expanded class to the code block
    $(this).addClass('expanded');

  }

});
