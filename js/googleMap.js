// the initial places
var initialPlaces = [
  {name: "Fischers Fritz", place_id: "ChIJN-CrHttRqEcRW8WVxZ0PUDk", type: "restaurant", formatted_address: "Charlottenstraße 49, 10117 Berlin, Tyskland"},
  {name: "Lutter & Wegner", place_id: "ChIJn3aH2MtRqEcRFCq5E46U1Zs", type: "restaurant", formatted_address: "Weinhaus Huth, Alte Potsdamer Str. 5, 10785 Berlin, Tyskland"},
  {name: "Maritim Hotel Berlin", place_id: "ChIJVW_VXbRRqEcROfZizUmpRGA", type: "hotel", formatted_address: "Stauffenbergstraße 26, 10785 Berlin, Tyskland"},
  {name: "Brandenburger Tor", place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY", type: "establishment", formatted_address: "Pariser Platz, 10117 Berlin, Tyskland"},
  {name: "Reichstagsgebäude", place_id: "ChIJbVDuQcdRqEcR5X3xq9NSG2Q", type: "establishment", formatted_address: "Platz der Republik 1, 11011 Berlin, Tyskland"},
  {name: "Gendarmenmarkt", place_id: "ChIJ4ZsybtpRqEcRkDdXJvRC7Wk", type: "establishment", formatted_address: "Gendarmenmarkt, 10117 Berlin, Tyskland"},
  {name: "Deutscher Dom", place_id: "ChIJ4ZsybtpRqEcRqBX6VAnUoAw", type: "church", formatted_address: "Gendarmenmarkt 1-2, 10117 Berlin, Tyskland"},
  {name: "Kaiser-Wilhelm-Gedächtnis-Kirche", place_id: "ChIJd2v8Cf9QqEcRnLCe4snacBA", type: "church", formatted_address: "Breitscheidplatz, 10789 Berlin, Tyskland"},
  {name: "Gedenkstätte Berliner Mauer", place_id: "ChIJZ0KxF_JRqEcRrLHB-4r-U-o", type: "establishment", formatted_address: "Bernauer Str. 111, 13355 Berlin, Tyskland"}
];

// available types to search for in the filter menu preferably from the server
var availableTypes = [
  {name: "default from google", type: ""},
  {name: "Train stations", type: "train_station"},
  {name: "Churches", type: "church"},
  {name: "Stores", type: "store"}
];

// the data for the map
var MapData = function(initialData) {
  var self = this;
  self.placeId = initialData.place_id;
  self.name = initialData.name;
  self.type = initialData.type;
  self.formatted_address = initialData.formatted_address;
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
  self.marker;
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
      self.service.getDetails(self.placeList()[i], callback);
    }
  } //end initMap

  function callback(request, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarker(request);
      // console.log(request);
    }
  } //end callback

  function createMarker(place) {
    self.marker = new google.maps.Marker({
      map: self.map,
      position: place.geometry.location
    });
    console.log(self.marker);
    console.log(place);
    //push the marker to the markers array to ba able to take them away before loading new markers
    self.markers.push(self.marker);
    addPins(place);

  } //end createMarker

  addPins = function(place) {
    google.maps.event.addListener(self.marker, 'click', function() {
      console.log(self.marker)
      console.log(place)
      self.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        place.formatted_address + '</div>');
      self.infowindow.open(self.map, this);
    });
  };


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
    console.log(selectedPlace);
    self.infowindow.setContent('<div><strong>' + selectedPlace.name + '</strong><br>' +
        selectedPlace.formatted_address + '</div>');
    self.infowindow.open(self.map, this);
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

  // callback funciton to the filter function. Takes the result as an array
  function callbackFilter(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
        self.placeList.push(new MapData(results[i]));
      }
    }
  } //end callbackFilter

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    console.log(self.markers);
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

