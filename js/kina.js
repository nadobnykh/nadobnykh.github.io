/* $('a[href^=#]').on('click', function(e){ */
$('.gotostartbutton').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  $('html, body').animate({
    scrollTop:$(href).offset().top
  },'slow');
});


