// the initial places
var initialPlaces = [
  {name: "Fischers Fritz", placeId: "ChIJN-CrHttRqEcRW8WVxZ0PUDk", type: "restaurant"},
  {name: "Lutter & Wegner", placeId: "ChIJn3aH2MtRqEcRFCq5E46U1Zs", type: "restaurant"},
  {name: "Maritim Hotel Berlin", placeId: "ChIJVW_VXbRRqEcROfZizUmpRGA", type: "hotel"},
  {name: "Brandenburger Tor", placeId: "ChIJiQnyVcZRqEcRY0xnhE77uyY", type: "establishment"},
  {name: "Reichstagsgebäude", placeId: "ChIJbVDuQcdRqEcR5X3xq9NSG2Q", type: "establishment"},
  {name: "Gendarmenmarkt", placeId: "ChIJ4ZsybtpRqEcRkDdXJvRC7Wk", type: "establishment"},
  {name: "Deutscher Dom", placeId: "ChIJ4ZsybtpRqEcRqBX6VAnUoAw", type: "church"},
  {name: "Kaiser-Wilhelm-Gedächtnis-Kirche", placeId: "ChIJd2v8Cf9QqEcRnLCe4snacBA", type: "church"},
  {name: "Gedenkstätte Berliner Mauer", placeId: "ChIJZ0KxF_JRqEcRrLHB-4r-U-o", type: "establishment"}
  ];

// the data for the map
function MapData(initialData) {
  var self = this;
  self.placeId = initialData.placeId;
  self.name = ko.observable(initialData.name);
};

// Overall viewmodel for the map with a init function
function MapViewModel() {
  var self = this;

  self.placeList = ko.observableArray([]);

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new MapData(placeItem))
  });

  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  self.map;
  self.infowindow;
  self.service;

  // available types to search for in the filter menu preferably from the server
  self.availableTypes = [
    {name: "Train stations", type: "train_station"},
    {name: "Churches", type: "church"},
    {name: "Stores", type: "store"}
    ];

  self.lookUp = ko.observable(self.availableTypes[0].type);


  // Puts a map in the map div, with specified lat and long
  self.initMap=function() {
    var berlin = {lat: 52.51, lng: 13.38};

    self.map = new google.maps.Map(document.getElementById('map'), {
      center: berlin,
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
      console.log(request);
    }
  } //end callback

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: self.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      self.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address + '</div>');
      self.infowindow.open(self.map, this);
    });
  } //end createMarker

    // A Places Nearby search is initiated with a call to the PlacesService's nearbySearch() method,
    // which will return an array of PlaceResult objects.
    // A Nearby Search lets you search for places within a specified area by keyword or type

    // var request = {
    //   location: berlin,
    //   radius: 1000,
    //   keyword: self.keyword,
    //   type: [self.type]
    // };
    // service.nearbySearch(request, callback);


} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);

