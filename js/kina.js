
var kinaMobileBreakpoint = 800;


/* $('a[href^=#]').on('click', function(e){ */
$('.gotostartbutton').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  $('html, body').animate({
    scrollTop:$(href).offset().top
  },'slow');
});

$(document).ready(function() {


  
  





  var stickyMenuDiv = $('.mainnav-wrapper').clone().appendTo('.body');
  stickyMenuDiv.addClass('stickytop');
  stickyMenuDiv.hide();
  
  $(window).scroll(function (event) {
    var scrollValue = $(window).scrollTop();

    //var kinaShowStickyScrollValue = ($(document).width() > kinaMobileBreakpoint) ? 120 : 0;

    if($(document).width() < kinaMobileBreakpoint || scrollValue > 120){
      stickyMenuDiv.show();
    } else {
      stickyMenuDiv.hide();
    }
  });
  
  //  MOBILE MENU
  var menuLinks = $('.mainnav-wrapper .mainnav a');
  var mobileMenuOpened = false;
  menuLinks.addClass('desktop');
  menuLinks.removeClass('mobile');

  $('.mobilemenuicon').on('click', function(e){
    e.preventDefault();
    if(mobileMenuOpened) {
      mobileMenuOpened = false;
      menuLinks.addClass('desktop');
      menuLinks.removeClass('mobile');
    } else {
      menuLinks.removeClass('desktop');
      menuLinks.addClass('mobile');
      mobileMenuOpened = true;
    }
  });

  menuLinks.on('click', function(e){
    mobileMenuOpened = false;
    menuLinks.addClass('desktop');
    menuLinks.removeClass('mobile');
  });
  // END: MOBILE MENU
  
  // Alle internen Links auswählen
  $('a[href*=\\#]').bind("click", function(event) {
    // Standard Verhalten unterdrücken
    event.preventDefault();

    // Linkziel in Variable schreiben
    var ziel = $(this).attr("href");
    var kinaTopOffsetOffset = ($(document).width() > kinaMobileBreakpoint) ? 75 : 100;
    var newScrollTop = $(ziel).offset().top - kinaTopOffsetOffset;
    var currentScrollTop = window.pageYOffset;
    var scrollDiff = Math.abs(currentScrollTop - newScrollTop);

    //Scrollen der Seite animieren, body benötigt für Safari
    $('html,body').animate({
      //Zum Ziel scrollen (Variable)
      scrollTop: newScrollTop
    // Dauer der Animation und Callbackfunktion die nach der Animation aufgerufen wird, sie stellt das Standardverhalten wieder her und ergänzt die URL
    }, ((scrollDiff > 2000) ? 0 : 1000) , function (){/*location.hash = ziel;*/});
   });
});
