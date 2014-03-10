
/* GLOBALS
-------------------------------------------------- */

var siteGlobals = {
	"basedir": "/",
	"font": "Open Sans"
};


$(function() {

	/* SECONDARY MENU
	-------------------------------------------------- */
	// Create Dynamic Menu
	$('h2, h3').each( function(index, element){
		// Add ID to each header
		var headerText = $(element).html();
		headerText = headerText.toLowerCase();
		headerText = headerText.replace( /'/ig, "" );
		headerText = headerText.replace( / /ig, "-" );
		$(element).attr( 'id', headerText );

		// Add menu item
		if ( $(this).is('h2') ) {
			$(".page-nav-container > .nav").append('<li><a href="#' + headerText + '">' + $(element).html() + '</a><ul class="nav"></ul></li>');
		} else {
			$(".page-nav-container > .nav > li").last().children('.nav').append('<li><a href="#' + headerText + '">' + $(element).html() + '</a></li>');
		}
	});
	// Clean up empty ULs
	$(".page-nav-container .nav:empty").remove();


	// Initialize the scrollspy and refresh it after content is set
	$('body').scrollspy({ target: '.page-nav-container' });
	
	/*
	$(window).on('load', function () {
		$('body').scrollspy('refresh');
	});
	*/

	// Gently scroll to anchor links
	$("a[href^='#']").on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $(this.hash).offset().top }, 400);
	});


	var $sideBar = $('.page-nav-container');
	//console.log($sideBar.offset().top);

	setTimeout(function () {
		$sideBar.affix({
			offset: {
				top: function () {
					var offsetTop = $sideBar.offset().top;
					//var marginTop = $sideBar.css('marginTop');
					//console.log(marginTop);
					//var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10);
					//var navOuterHeight = $('.page-nav').height();

					//return (this.top = offsetTop - navOuterHeight - sideBarMargin);
					return (this.top = offsetTop + 80);
				}
			}
		})
	}, 200);

});
