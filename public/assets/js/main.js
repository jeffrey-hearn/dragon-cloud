
$(function() {

	/* SECONDARY MENU
	-------------------------------------------------- */
	// Create Dynamic Menu
	$('h2').each( function(index, element){
		// Add ID to each header
		var headerText = $(element).html();
		headerText = headerText.toLowerCase();
		headerText = headerText.replace( / /i, "-" );
		console.log(headerText);
		$(element).attr( 'id', headerText );

		// Add menu item
		$(".page-nav > .nav").append('<li><a href="#' + headerText + '">' + $(element).html() + '</a></li>')
	});

	// Initialize the scrollspy and refresh it after content is set
	$('body').scrollspy({ target: '.page-nav' });
	$(window).on('load', function () {
		$('body').scrollspy('refresh');
	});

	// Gently scroll to anchor links
	$("a[href^='#']").on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $(this.hash).offset().top }, 300);
	});

});
