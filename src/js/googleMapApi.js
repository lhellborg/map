//google map API


var map; //google map
var infowindow; //the window shown with information about a place
var service; //the google API service
var markers = []; //an array for hte shown markers, used to clear the map before other selections

var loc = {
    lat: 52.51,
    lng: 13.38
}; //location of Berlin

// Puts a map in the map div, with specified lat and long
var initMap = function() {


    map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 13
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    for (var i = 0; i < model.placeList().length; i++) { //placeList is an observable array of MapData objects (onePlace)
        var onePlace = model.placeList()[i];
        service.getDetails(onePlace, makeCallback(onePlace)); //for each onePlace we will add the corresponding marker with an "iffy" callback
    }
}; //end initMap

function makeCallback(myPlace) { //return the original callback function with the marker as a key in the MapData object
    return function callback(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            myPlace.marker = createMarker(place); //create a marker object and put it as a key in the MapData (myPlace) object
        } else if (status === google.maps.places.PlacesServiceStatus.ERROR) { //error handling when server does not respond
            $("#map").append("<p>There was a problem contacting the Google servers</p>");
        } else {
            $("#map").append("<p>Sorry, could not get the map</p>"); //error message for all other errors
        }

    }; //end callback
} // end makeCallback

function createMarker(place) {
    var image = { //the image to be shown as map marker, different depending on the type of place
        url: place.icon, // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(12, 15) // anchor
    };
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: image //show a mapMarker depending on the type of place
    });

    markers.push(marker); //push the marker to the markers array to ba able to take them away before loading new markers
    addPins(place, marker); //add map markers
    return marker;
} //end createMarker

//upon click on a mapmarker the infoWindow appear and the mapMarker is turned green
var addPins = function(place, marker) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            '<img id="icon" src=' + place.icon + '></div><div class=' +
            "wiki-container" + '><ul class=' + "wiki-links" + '></ul></div>');
        wikiRequest(place.name); // add links to the wikipedia site for the name bound to the place
        this.setIcon('https://www.google.com/mapfiles/marker_green.png'); //Change the marker icon to green when clicked. Stays green.
        infowindow.open(self.map, this);
        toggleBounce(marker); //toggle the map markers between bounce and still
    });
}; //end addPins

//toggle the map markers to bounce on click
var toggleBounce = function(marker) {
    google.maps.event.addListener(marker, 'click', toggleBounceList(marker));
};


// when an list item is clicked make an infoWindow in the map and set the mapMarker green and make it bounce
model.currentPlace.subscribe(function(selectedPlace) {
    infowindow.setContent('<div><strong>' + selectedPlace.name + '</strong><br>' +
        '<img id="icon" src=' + selectedPlace.icon + '></div><div class=' +
        "wiki-container" + '><ul class=' + "wiki-links" + '></ul></div>');
    wikiRequest(selectedPlace.name); // add links to the wikipedia site for the name bound to the place
    infowindow.open(self.map, selectedPlace.marker);
    selectedPlace.marker.setIcon('https://www.google.com/mapfiles/marker_green.png'); //Change the marker icon
    toggleBounceList(selectedPlace.marker); //toggle the map markers to bounce on click
});


//makes the map markers bounce for a list item
function toggleBounceList(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.setAnimation(null);
    }, 700);
}; //end toggleBounceList


// filter the markers on the map with the selectedTypes and
// update the placeList with the new places
function filter(type) {
    // to delete the current markers on the map witout loading the map again
    clearMarkers();

    var request = {
        location: loc,
        radius: 1500,
        type: type
    };

    service.nearbySearch(request, callbackFilter); // A Nearby Search lets you search for places within a specified area by keyword or type
} //end filter

function specialSearch(search) {
    // to delete the current markers on the map witout loading the map again
    clearMarkers();

    var request = {
        location: loc,
        radius: 1000,
        query: search
    };

    service.textSearch(request, callbackFilter);
} //end specialSearch

// callback function to the filter function. Takes the result as an array
function callbackFilter(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            place.marker = createMarker(results[i]);
            model.placeList.push(new MapData(place));
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        var nothingFound = {
            name: "Sorry, no result found, try another one",
            icon: "http://www.pic4ever.com/images/kaffeetrinker_2.gif"
        };
        model.placeList.push(new MapData(nothingFound));
    } else {
        var somethingWrong = {
            name: "Sorry, something went wrong, try again later",
            icon: "http://www.pic4ever.com/images/kaffeetrinker_2.gif"
        };
        model.placeList.push(new MapData(somethingWrong));
    }
} //end callbackFilter

// Sets the map on all markers in the array.
function hideMarkers(currentMarkers) {
    for (var i = 0; i < currentMarkers.length; i++) {
        currentMarkers[i].setVisible(false);
    }
} //end setMapOnAll

// Removes the markers from the map, and delete them from the marker array.
function clearMarkers() {
    var currentMarkers = markers.slice(0);
    hideMarkers(currentMarkers);
    markers = [];
} // end clearMarkers


model.filterList.subscribe(function(newFilterList) {
    console.log("change")
        // to delete the current markers on the map witout loading the map again
    hideMarkers(markers);

    for (var i = 0; i < newFilterList.length; i++) { //placeList is an observable array of MapData objects (onePlace)
        var onePlace = newFilterList[i];
        onePlace.marker.setVisible(true);
    }

    //clearMarkers funciton will sometimes delete mapMarkers after they have been drawn on the map.
    // To avoid that I set a timeout function on the newly created markers

})
