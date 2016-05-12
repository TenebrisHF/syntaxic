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

    // Animate max height to 200px (Hackforums default)
    $(this).animate({maxHeight: '200px'}, 'slow');

    // Remove the expanded class
    $(this).removeClass('expanded');

  // If the class is not expanded
  }else{

    // Get the actual height of the code block
    var height = this.scrollHeight;

    // Animate the max-height to the actual height
    $(this).animate({maxHeight: height}, 'slow');

    // Add the expanded class to the code block
    $(this).addClass('expanded');

  }

});
