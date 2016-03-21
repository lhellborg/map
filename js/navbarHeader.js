//when clicked the weather of Berlin will be shown in the mainWindow
$("#weathe").click(function() {
	$("#mainWindow").append( '<iframe class=' + "mapReplace" + ' src=' + "http://www.yr.no/place/Germany/Berlin/Berlin/" + '></iframe>');
	$(".mapReplace").append('<p>Your browser does not support iframes.</p>')
});

$('#mapButton').on('click', function() {
	$('.change').each(function() {
		$(this).removeClass('active'); //take away the active class on any change item
	});
	$('.mainWindow').each(function() {
		$(this).addClass('hidden'); //add a hidden class on all mainWindows
	});
	$(this).addClass('active'); //add active class on the clicked item
	$("#map").removeClass('hidden') //remove hidden class on the element to be shown in hte main window
});

$('#weatherButton').on('click', function() {
	$('.change').each(function() {
		$(this).removeClass('active'); //take away the active class on any change item
	});
	$('.mainWindow').each(function() {
		$(this).addClass('hidden'); //add a hidden class on all mainWindows
	});
	$(this).addClass('active'); //add active class on the clicked item
	$("#showWeather").removeClass('hidden') //remove hidden class on the element to be shown in hte main window
});

function getWeather() {
    var location = "berlin";

    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'
    	+ location + '")&format=json', function (data) {
        /* Check that a place was found (we'll just grab the first) */
        if (data.query.results === null) {
            bootbox.alert("Location not found: " + location + "!");

        } else {
            $('#showWeather').html('<h2>' + data.query.results.channel.item.title + '</h2>' +
                data.query.results.channel.item.description)
            $('.wheater-container').show();
        }

    });
};

getWeather();