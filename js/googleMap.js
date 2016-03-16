// the data for the map
function mapData(initialType) {
  var self = this;
  self.type = ko.observable(initialType)

}

// Overall viewmodel for the map with a init function
function MapViewModel() {
  var self = this;
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  self.map;
  self.infowindow;
  // available types to search for in the filter menu preferably from the server
  self.availableTypes = ko.observableArray([
    {type: "train_station"},
    {type: "church"},
    {type: "store"}
    ]);

  self.lookUp = ko.observable(new mapData(self.availableTypes[0]));

  // Puts a map in the map div, with specified lat and long
  self.initMap=function() {
    var berlin = {lat: 52.51, lng: 13.38};

    self.map = new google.maps.Map(document.getElementById('map'), {
      center: berlin,
      zoom: 14
    });

    infowindow = new google.maps.InfoWindow();
    // A Places Nearby search is initiated with a call to the PlacesService's nearbySearch() method,
    // which will return an array of PlaceResult objects.
    var service = new google.maps.places.PlacesService(self.map);
    // A Nearby Search lets you search for places within a specified area by keyword or type

    service.nearbySearch({
      location: berlin,
      radius: 1000,
      type: ["train_station"]
    }, callback);
  }

  // loop over the PlaceResult array from nearbySearch and calls the createMarker function
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

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
  }
}

var model = new MapViewModel();
ko.applyBindings(model);