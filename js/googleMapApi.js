  // Tƒhis example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


  var map;
  var infowindow;
  var service;
  var markers = [];

  var loc = {lat: 52.51, lng: 13.38};

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

  var addPins = function(place, marker) {
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        '<img id="icon" src=' + place.icon + '></div>');
      infowindow.open(self.map, this);
      //Change the marker icon
      this.setIcon('https://www.google.com/mapfiles/marker_green.png');
    });
  };

  //makes the map markers bounce
  var toggleBounce = function(marker) {
    google.maps.event.addListener(marker, 'click', function() {
      if (marker.getAnimation() !== null) {
       marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  }; //end toggleBounce

    // when an list item is clicked make an infoWindow in the map
  model.currentPlace.subscribe(function(selectedPlace) {
    infowindow.setContent('<div><strong>' + selectedPlace.name + '</strong><br>' +
        '<img id="icon" src=' + selectedPlace.icon + '></div>');
    infowindow.open(self.map, selectedPlace.marker);
  });