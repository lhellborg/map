// the initial places
var initialPlaces = [
  {name: "Fischers Fritz", place_id: "ChIJN-CrHttRqEcRW8WVxZ0PUDk", type: "restaurant"},
  {name: "Lutter & Wegner", place_id: "ChIJn3aH2MtRqEcRFCq5E46U1Zs", type: "restaurant"},
  {name: "Maritim Hotel Berlin", place_id: "ChIJVW_VXbRRqEcROfZizUmpRGA", type: "hotel"},
  {name: "Brandenburger Tor", place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY", type: "establishment"},
  {name: "Reichstagsgebäude", place_id: "ChIJbVDuQcdRqEcR5X3xq9NSG2Q", type: "establishment"},
  {name: "Gendarmenmarkt", place_id: "ChIJ4ZsybtpRqEcRkDdXJvRC7Wk", type: "establishment"},
  {name: "Deutscher Dom", place_id: "ChIJ4ZsybtpRqEcRqBX6VAnUoAw", type: "church"},
  {name: "Kaiser-Wilhelm-Gedächtnis-Kirche", place_id: "ChIJd2v8Cf9QqEcRnLCe4snacBA", type: "church"},
  {name: "Gedenkstätte Berliner Mauer", place_id: "ChIJZ0KxF_JRqEcRrLHB-4r-U-o", type: "establishment"}
];

// available types to search for in the filter menu preferably from the server
var availableTypes = [
  {name: "nothing", type: ""},
  {name: "Train stations", type: "train_station"},
  {name: "Churches", type: "church"},
  {name: "Stores", type: "store"}
];

// the data for the map
var MapData = function(initialData) {
  var self = this;
  self.placeId = initialData.place_id;
  self.name = ko.observable(initialData.name);
  self.type = ko.observable(initialData.type);
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
      zoom: 14
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
    var marker = new google.maps.Marker({
      map: self.map,
      position: place.geometry.location
    });
    //push the marker to the markers array to ba able to take them away before loading new markers
    self.markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
      self.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address + '</div>');
      self.infowindow.open(self.map, this);
    });
  } //end createMarker


  self.typeList = ko.observableArray([]);

  // noneditable data of types to be filtered
  availableTypes.forEach(function(typeItem) {
    self.typeList.push(new Types(typeItem))
  });

  self.selectedType = ko.observable();
  // filter the markers on the map with the selectedType and
  // update the placeList with the new places
  self.selectedType.subscribe(function(newValue) {
    filter(newValue.type);
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
        console.log(results[i]);
        self.placeList.push(new MapData(results[i]));
      }
    }
  } //end callbackFilter

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < self.markers.length; i++) {
      self.markers[i].setMap(map);
    }
  } //end setMapOnAll

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }


} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);

