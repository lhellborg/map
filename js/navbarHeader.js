//clickable navbar header
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

//taken form tutorial How to Build a Yahoo! Weather "Hello World" Application in JavaScript by Chris Wood.
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
        }

    });
};

getWeather();
