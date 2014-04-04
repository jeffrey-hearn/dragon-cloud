
$(function() {



	/* SEXY BACKGROUNDS SO SEXY
	-------------------------------------------------- */
	$.stellar();


	/* ENDNOTES
	-------------------------------------------------- */
	
	// Get reference data
	$.getJSON( siteGlobals.path + "data/references.json", function( refs ) {
		// housekeeping
		var refIDs = [];
		// Check for inline citations
		if ( $('sup[data-ref-id!=""]') ){
			// Add a header to the section
			var endnotes = $('#references').before('<h2 class="ref-header">References</h2>');
			// Iterate over inline citations
			$('sup[data-ref-id]').each(function(i){
				var refID = $(this).data('ref-id'),
				    citationIndex = i + 1;
				// Check if the reference item has been referenced yet
				if ( $.inArray( refID, refIDs ) == -1 ){
					// Add the reference to the list
					refIDs.push(refID);
					// Create a reference item
					endnotes.append( '<li class="ref-item small" id="ref-item-'+refIDs.length+'">' + 
						refs[ refID ].title +
						'<ul class="ref-item-citations"></ul>' +
						'</li>' );
				} else {
					// Insert the two reciprocal links? Sublist of citations?
				}
				$('#ref-item-'+refIDs.length+' .ref-item-citations')
					.append('<li class=""><a href="#ref-citation-'+citationIndex+'" class="ref-item-reciprocal-link"><span class="glyphicon glyphicon-arrow-up"></span></a> '+ $(this).data('citation-note') +'</li>');

				// Add a link to the reference, text for the citation, and tooltip text.
				// (since this is an async block, must init tooltips explicitly rather 
				// than use the catch-all since it will have already completed)
				$(this)
					.attr('data-toggle', 'tooltip')
					.attr('id', 'ref-citation-'+citationIndex)
					.attr('data-placement', 'top')
					.attr('title', refs[ refID ].title + ' ' + $(this).data('citation-note'))
					.append('<a href="#ref-item-'+refIDs.length+'">'+citationIndex+'</a>')
					.tooltip();
			});
		}

	});

	// Init any other tooltips
	$('*[data-toggle="tooltip"]').tooltip();






	/* SECONDARY MENU
	-------------------------------------------------- */
	// Create Dynamic Menu
	$('h2, h3').each( function(index, element){
		// Add ID to each header
		var headerText = $(element).html();
		headerText = headerText.toLowerCase();
		headerText = headerText.replace( /[':]/ig, "" );
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
	
	// Gently scroll to anchor links
	$("a[href^='#']").on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $(this.hash).offset().top }, 400);
	});

	var $sideBar = $('.page-nav-container');
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
					return (this.top = offsetTop + 60);
				}
			}
		});
		$sideBar.width( $sideBar.width() );
	}, 200);

});
