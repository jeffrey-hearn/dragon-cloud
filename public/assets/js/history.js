
$(function() {

	// Timeline query
	var timelineSlug = $("body").data("timeline");

	// Timeline files
	var timelineDataFiles = [ "india" ];

	/* TIMELINE CONFIGS
	-------------------------------------------------- */
	var timelineConfigMd = {
		width:              '100%',
		height:             '500',
		source:             {},
		embed_id:           'timeline-embed',				//OPTIONAL USE A DIFFERENT DIV ID FOR EMBED
		start_zoom_adjust:  '3',							//OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
		hash_bookmark:      true,							//OPTIONAL LOCATION BAR HASHES
		lang:               'en',							//OPTIONAL LANGUAGE
	}

    var timelineObj = {
		"timeline": {
			"headline":"The Main Timeline Headline Goes here",
			"type":"default",
			"text":"<p>Intro body text goes here, some HTML is ok</p>",
			"asset": {},
			"date": [],
			"era": []
		}
	};

	// Combine timeline data files into a single list
	$.each( timelineDataFiles, function( i, file ) {
		$.getJSON( siteGlobals.basedir + "data/timeline-"+file+".json", function( data ) {
			$.each( data.date, function( i, date ) {
				timelineObj.timeline.date.push( date );
			});
			$.each( data.era, function( i, era ) {
				timelineObj.timeline.era.push( era );
			});
			console.log(timelineObj);

			// Attach the timeline data
			timelineConfigMd.source = timelineObj;

			// Render the timeline
			createStoryJS( timelineConfigMd );
		});
	});

});
