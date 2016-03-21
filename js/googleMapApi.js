//google map API


  var map; //google map
  var infowindow; //the window shown with information about a place
  var service; //the google API service
  var markers = []; //an array for hte shown markers, used to clear the map before other selections

  var loc = {lat: 52.51, lng: 13.38}; //location fo Berlin

  // Puts a map in the map div, with specified lat and long
 var initMap = function() {


    map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 13
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    for (var i = 0; i < model.placeList().length; i++) {
      var onePlace = model.placeList()[i];
      //for each onePlace we will add the corresponding marker with an "iffy" callback
      service.getDetails(onePlace, makeCallback(onePlace));
    }
  } //end initMap

  function makeCallback(myPlace) {
    return function callback(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        myPlace.marker = createMarker(place);
      } else if (status === google.maps.places.PlacesServiceStatus.ERROR){
        $("#map").append("<p>There was a problem contacting the Google servers</p>");
      } else {
        $("#map").append("<p>Sorry, could not get the map</p>");
      }

    } //end callback
  } // end makeCallback

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    //push the marker to the markers array to ba able to take them away before loading new markers
    markers.push(marker);
    addPins(place, marker);
    toggleBounce(marker);
    return marker;
  } //end createMarker

  //upon click on a mapmarker the infoWindow appear and the mapMarker is turned green
  var addPins = function(place, marker) {
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        '<img id="icon" src=' + place.icon + '></div><div class=' +
        "wiki-container" + '><ul class=' + "wiki-links" + '></ul></div>');
      wikiRequest(place.name);
      //Change the marker icon
      this.setIcon('https://www.google.com/mapfiles/marker_green.png');
      infowindow.open(self.map, this);
    });
  };

  //makes the map markers bounce
  var toggleBounce = function(marker) {
    google.maps.event.addListener(marker, 'click', function() {
      if (marker.getAnimation()) {
       marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  }; //end toggleBounce

    // when an list item is clicked make an infoWindow in the map and set the mapMarker green and make it bounce
  model.currentPlace.subscribe(function(selectedPlace) {
    infowindow.setContent('<div><strong>' + selectedPlace.name + '</strong><br>' +
        '<img id="icon" src=' + selectedPlace.icon + '></div><div class=' +
        "wiki-container" + '><ul class=' + "wiki-links" + '></ul></div>');
      wikiRequest(selectedPlace.name);
    infowindow.open(self.map, selectedPlace.marker);
    //Change the marker icon
    selectedPlace.marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
    toggleBounceList(selectedPlace.marker);
  });


  //makes the map markers bounce for a list item
  var toggleBounceList = function(marker) {
    if (marker.getAnimation()) {
     marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }; //end toggleBounce


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
  }; //end filter

  function specialSearch(search) {
    // to delete the current markers on the map witout loading the map again
    clearMarkers();

    var request = {
      location: loc,
      radius: 1000,
      query: search
    };

    service.textSearch(request, callbackFilter);
  }; //end filter

  // callback function to the filter function. Takes the result as an array
  function callbackFilter(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        place.marker = createMarker(results[i]);
        model.placeList.push(new MapData(place));
      }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      var nothingFound = {name: "Sorry, no result found, try another one", icon: "http://www.pic4ever.com/images/kaffeetrinker_2.gif"};
      model.placeList.push(new MapData(nothingFound));
    } else {
      var nothingFound = {name: "Sorry, something went wrong, try again later", icon: "http://www.pic4ever.com/images/kaffeetrinker_2.gif"};
      model.placeList.push(new MapData(nothingFound));
    }
  } //end callbackFilter

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  } //end setMapOnAll

  // Removes the markers from the map, and delete them from the marker array.
  function clearMarkers() {
    setMapOnAll(null);
    markers = [];
  }// end clearMarkers