
$(function() {

	// Timeline query
	var timelineSlug = $("body").data("timeline");

	// Timeline meta
	var timelineMeta = {
		"index": {
			"title": "Tea Through Time",
			"description": "<p>Drag to move the timeline. Events are grouped by type: Political, Cultural, and Economic</p>",
			"files": [ "india" ]
		},
		"india": {
			"title": "Timeline of Events in India",
			"description": "<p>Drag to move the timeline. Events are grouped by type: Political, Cultural, and Economic</p>",
			"files": [ "india" ]
		}
	}

	/* TIMELINE CONFIGS
	-------------------------------------------------- */
	var timelineConfigMd = {
		width:              '100%',
		height:             '500',
		source:             {},
		embed_id:           'timeline-embed',				//OPTIONAL USE A DIFFERENT DIV ID FOR EMBED
		start_zoom_adjust:  '3',							//OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
		hash_bookmark:      false,							//OPTIONAL LOCATION BAR HASHES
		lang:               'en',							//OPTIONAL LANGUAGE
	}

    var timelineObj = {
		"timeline": {
			"headline": timelineMeta[timelineSlug].title,
			"type":"default",
			"text": timelineMeta[timelineSlug].description,
			"asset": {},
			"date": [],
			"era": []
		}
	};

	// Combine timeline data files into a single list
	$.each( timelineMeta[timelineSlug].files, function( i, file ) {
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

			// Render tweaks
			//$("#timeline-embed .era div").addClass();
		});
	});

});
