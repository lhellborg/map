// the data for the map
function MapData(initialType) {
  var self = this;
  self.type = ko.observable(initialType)

};

// Overall viewmodel for the map with a init function
function MapViewModel() {
  var self = this;
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  self.map;
  self.type = "restaurant";
  self.keyword = "Fischers Fritz";
  self.infowindow;
  self.defaultPlaces = [
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

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(self.map);
    var requests = [
    {placeId: 'ChIJN-CrHttRqEcRW8WVxZ0PUDk'},
    {placeId: 'ChIJn3aH2MtRqEcRFCq5E46U1Zs'}
    ];

    for (var i = 0; i < self.defaultPlaces.length; i++) {
      service.getDetails(requests[i], callback);
    }

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
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(self.map, this);
      });
    } //end createMarker


    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    //     'Place ID: ' + place.place_id + '<br>' +
    //     place.formatted_address + '</div>');
    //   infowindow.open(self.map, this);
    // });


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

  } //end initMap

  // loop over the PlaceResult array from nearbySearch and calls the createMarker function
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
      }
    }
  } //end callback

  // puts a marker on all the places on the map defined by the callback function
  function createMarker(place) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      map: self.map,
      position: place.geometry.location
    });

  // add eventListener to the markers for an infoWindow
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(self.map, this);
    });
  } //end createMarker
} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);

