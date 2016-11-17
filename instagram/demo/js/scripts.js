/*
 * Instagram Element
 * Version: 1.0
 *
 * Author: Chris Rivers
 * http://codecanyon.net/user/xxcriversxx
 *
 *
 * Changelog: 
 * Version: 1.0
 *
 */

$(document).ready(function(){
	// Calling the Plugin
	$('.element').instagramElement({
		mode : 'user',
		userID : '6281714',
		accessToken : 'XX-XXXX-XXXX',
		galleryMode: 'classic',
		video: true,
		showVideoControls: false
	});
	
	// Custom Select Box
    $('select.custom-sel').each(function(){
       	var selectStyled = '<div class="selectStyled">' + $(this).find('option:selected').text() + '</div>';
       	$(this).wrap('<div class="selectWrap" />').before(selectStyled);

    }).change(function(){
       	var selectStyled = $(this).find('option:selected').text() + '<div class="selectArrow"></div>';
       	$(this).parent().find('.selectStyled').html(selectStyled);
    });
	
	// Customization Bar
	$(".ig-controller-toggle").click(function(){
		
		$(this).toggleClass("active");
		
		if( $(this).hasClass("active") ){
			// OPEN
			$(".ig-controller").stop().animate({
				right: ["0", "easeOutQuad"]
			}, 600);
			
		} else {
			// CLOSE
			$(".ig-controller").stop().animate({
				right: ["-250", "easeOutQuad"]
			}, 600);
		}
		
	});
	
	$(".ig-controller .config").eq(0).show();
	
	var configIsAnimating = 0;
	
	$(".toggle-config").click(function(){
		if( configIsAnimating == 0 ){
			
			configIsAnimating = 1;
			
			$(".ig-controller .config").fadeOut(200);
			$(".ig-controller").find("." + $(this).attr("title") ).delay(200).fadeIn();
		
			// CLOSE
			$(".ig-controller").animate({
				right: ["-250", "easeOutQuad"]
			}, 300);
		
			// OPEN
			$(".ig-controller").delay(300).animate({
				right: ["0", "easeOutQuad"]
			}, 300, function(){
				configIsAnimating = 0;
			});
		}
	});
	
	// Customize Size
	$("select.gridSize").change(function(){
		// Reset Gutter
		$("select.gutterSize option:eq(0)").prop('selected', true);
		$("select.widgetSize option:eq(0)").prop('selected', true);
       	$("select.gutterSize").parent().find('.selectStyled').html($("select.gutterSize option:eq(0)").text() + '<div class="selectArrow"></div>');
		$("select.widgetSize").parent().find('.selectStyled').html($("select.widgetSize option:eq(0)").text() + '<div class="selectArrow"></div>');
		
		// Reset Class
		$(".instagram-element").attr("class","element instagram-element");
		$(".instagram-element").addClass("col-" + $(this).val());
	});
	
	$("select.gutterSize").change(function(){
		// Reset Gutter
		$("select.gridSize option:eq(0)").prop('selected', true);
		$("select.widgetSize option:eq(0)").prop('selected', true);
       	$("select.gridSize").parent().find('.selectStyled').html($("select.gridSize option:eq(0)").text() + '<div class="selectArrow"></div>');
		$("select.widgetSize").parent().find('.selectStyled').html($("select.widgetSize option:eq(0)").text() + '<div class="selectArrow"></div>');
		
		// Reset Class
		$(".instagram-element").attr("class","element instagram-element");
		$(".instagram-element").addClass("gutter-" + $(this).val());
	});
	
	$("select.widgetSize").change(function(){
		// Reset Gutter
		$("select.gridSize option:eq(0)").prop('selected', true);
		$("select.gutterSize option:eq(0)").prop('selected', true);
       	$("select.gridSize").parent().find('.selectStyled').html($("select.gridSize option:eq(0)").text() + '<div class="selectArrow"></div>');
		$("select.gutterSize").parent().find('.selectStyled').html($("select.gutterSize option:eq(0)").text() + '<div class="selectArrow"></div>');
		
		// Reset Class
		$(".instagram-element").attr("class","element instagram-element");
		$(".instagram-element").addClass("widget-" + $(this).val());
	});
	
	// Customize Color
	$('.element-colorpicker').spectrum({
		allowEmpty:true,
		preferredFormat: "hex",
		showAlpha: true,
		change: function(color) {
			$(".instagram-element").css("background",$(".cp-bg").val());
			$(".instagram-photo.image").css("background",$(".cp-overlay-bg").val());
			$(".instagram-element .element-meta strong").css("color",$(".cp-overlay-head").val());
			$(".instagram-element .element-meta span").css("color",$(".cp-overlay-paragraph").val());
			
			$(".username-ui").css("color",$(".cp-popup-head").val());
			$(".date-ui").css("color",$(".cp-popup-date").val());
			$(".description-ui").css("color",$(".cp-popup-caption").val());
			$(".link-ui").css("color",$(".cp-popup-link").val());
		}
	});
		
	// Customize Theme
	$(".ig-controller_container .themes a").click(function(){
		// Remove Old
		$("body").removeClass("ig-business");
		$("body").removeClass("ig-dream");
		$("body").removeClass("ig-success");
		$("body").removeClass("ig-pinterest");
		$("body").removeClass("ig-ego");
		$("body").removeClass("ig-fashion");
		$(".ig-controller_container a").removeClass("active");
		
		// Add New
		$("body").addClass($(this).attr("class"));
		$(this).addClass("active");
	});
	
});