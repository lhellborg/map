


// the data for the map
var MapData = function(initialData) {
  var self = this;
  self.placeId = initialData.place_id;
  self.name = initialData.name;
  self.type = initialData.type;
  self.formatted_address = initialData.formatted_address;
  self.icon = initialData.icon;
  self.marker=initialData.marker;
};

var Types = function(dataTypes) {
  var self = this;
  self.name = dataTypes.name;
  self.type = dataTypes.type;
};

// Overall viewmodel for the map with a init function
function MapViewModel() {
  var self = this;

  self.placeList = ko.observableArray([]);

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new MapData(placeItem));
  });


  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  self.map;
  self.infowindow;
  self.service;
  self.location = {lat: 52.51, lng: 13.38};
  self.markers = [];


  // Puts a map in the map div, with specified lat and long
  self.initMap=function() {

    self.map = new google.maps.Map(document.getElementById('map'), {
      center: self.location,
      zoom: 13
    });

    self.infowindow = new google.maps.InfoWindow();
    self.service = new google.maps.places.PlacesService(self.map);

    for (var i = 0; i < self.placeList().length; i++) {
      var onePlace = self.placeList()[i];
      //for each onePlace we will add the corresponding marker with an "iffy" callback
      self.service.getDetails(onePlace, makeCallback(onePlace));
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
      map: self.map,
      position: place.geometry.location
    });
    //push the marker to the markers array to ba able to take them away before loading new markers

    self.markers.push(marker);
    addPins(place, marker);
    toggleBounce(marker);
    return marker;
  } //end createMarker

  addPins = function(place, marker) {
    google.maps.event.addListener(marker, 'click', function() {
      self.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        '<img id="icon" src=' + place.icon + '></div>');
      self.infowindow.open(self.map, this);
      //Change the marker icon
      this.setIcon('https://www.google.com/mapfiles/marker_green.png');
    });
  };

  //makes the map markers bounce
  toggleBounce = function(marker) {
    google.maps.event.addListener(marker, 'click', function() {
      if (marker.getAnimation() !== null) {
       marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  }; //end toggleBounce

  // the list of types to be filtered
  self.typeList = ko.observableArray([]);

  // noneditable data of types to be filtered
  availableTypes.forEach(function(typeItem) {
    self.typeList.push(new Types(typeItem))
  });

  self.selectedType = ko.observable();
  // filter the markers on the map with the selectedType and
  // update the placeList with the new places
  self.selectedType.subscribe(function(newType) {
    //empty the self.placeList array
    self.placeList().length = 0;
    filter(newType.type);
  });

  //the clicked list item
  self.currentPlace = ko.observable();

  // when an list item is clicked make an infoWindow in the map
  self.currentPlace.subscribe(function(selectedPlace) {
    self.infowindow.setContent('<div><strong>' + selectedPlace.name + '</strong><br>' +
        '<img id="icon" src=' + selectedPlace.icon + '></div>');
    self.infowindow.open(self.map, selectedPlace.marker);
  });


    // A Places Nearby search is initiated with a call to the PlacesService's nearbySearch() method,
    // which will return an array of PlaceResult objects.
    // A Nearby Search lets you search for places within a specified area by keyword or type
  function filter(type) {
    // to delete the current markers on the map witout loading the map again
    clearMarkers();

    // self.map = new google.maps.Map(document.getElementById('map'), {
    //   center: self.location,
    //   zoom: 14
    // });

    var request = {
      location: self.location,
      radius: 1500,
      type: [type]
    };

    self.service.nearbySearch(request, callbackFilter);
  };

  // callback function to the filter function. Takes the result as an array
  function callbackFilter(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        place.marker = createMarker(results[i]);
        self.placeList.push(new MapData(place));
      }
    }
  } //end callbackFilter

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < self.markers.length; i++) {
      self.markers[i].setMap(map);
    }
  } //end setMapOnAll

  // Removes the markers from the map, and delete them from the marker array.
  function clearMarkers() {
    setMapOnAll(null);
    self.markers = [];
  }


} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);

