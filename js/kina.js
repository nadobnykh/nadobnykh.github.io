
var kinaMobileBreakpoint = 900;


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

    if($(document).width() < kinaMobileBreakpoint || scrollValue > 130){
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
    var kinaTopOffsetOffset = ($(document).width() > kinaMobileBreakpoint) ? 85 : 100;
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











/* SLIDER STUFF */

jssor_1_slider_init = function () {

  var jssor_1_SlideoTransitions = [
      [{b: -1, d: 1, o: -1}, {b: 0, d: 1000, o: 1}],
      [{b: 1900, d: 2000, x: -379, e: {x: 7}}],
      [{b: 1900, d: 2000, x: -379, e: {x: 7}}],
      [{b: -1, d: 1, o: -1, r: 288, sX: 9, sY: 9}, {
          b: 1000,
          d: 900,
          x: -1400,
          y: -660,
          o: 1,
          r: -288,
          sX: -9,
          sY: -9,
          e: {r: 6}
      }, {b: 1900, d: 1600, x: -200, o: -1, e: {x: 16}}]
  ];

  var jssor_1_options = {
      $AutoPlay: true,
      $SlideDuration: 800,
      $SlideEasing: $Jease$.$OutQuint,
      $CaptionSliderOptions: {
          $Class: $JssorCaptionSlideo$,
          $Transitions: jssor_1_SlideoTransitions
      },
      $ArrowNavigatorOptions: {
          $Class: $JssorArrowNavigator$
      },
      $BulletNavigatorOptions: {
          $Class: $JssorBulletNavigator$
      }
  };

  var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

  /*responsive code begin*/
  /*you can remove responsive code if you don't want the slider scales while window resizing*/
  function ScaleSlider() {
      var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
      if (refSize) {
          refSize = Math.min(refSize, 1920);
          jssor_1_slider.$ScaleWidth(refSize);
      }
      else {
          window.setTimeout(ScaleSlider, 30);
      }
  }

  ScaleSlider();
  $Jssor$.$AddEvent(window, "load", ScaleSlider);
  $Jssor$.$AddEvent(window, "resize", ScaleSlider);
  $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
  /*responsive code end*/
};


$(document).ready(function() { jssor_1_slider_init(); });





