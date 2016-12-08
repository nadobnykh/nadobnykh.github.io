/* $('a[href^=#]').on('click', function(e){ */
$('.gotostartbutton').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  $('html, body').animate({
    scrollTop:$(href).offset().top
  },'slow');
});

$(document).ready(function() {
    // Alle internen Links auswählen
    $('a[href*=\\#]').bind("click", function(event) {
      // Standard Verhalten unterdrücken
      event.preventDefault();
      // Linkziel in Variable schreiben
      var ziel = $(this).attr("href");
      //Scrollen der Seite animieren, body benötigt für Safari
      $('html,body').animate({
        //Zum Ziel scrollen (Variable)
        scrollTop: $(ziel).offset().top
      // Dauer der Animation und Callbackfunktion die nach der Animation aufgerufen wird, sie stellt das Standardverhalten wieder her und ergänzt die URL
      }, 1000 , function (){location.hash = ziel;});
     });
  return false;
});

$(window).scroll(function (event) {
    var scrollValue = $(window).scrollTop();
    if(scrollValue > 200){
      $('.mainnav').addClass('stickytop');
    } else {
      $('.mainnav').removeClass('stickytop');
    }
});


