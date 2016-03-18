


// the data for the map
var MapData = function(initialData) {
  var self = this;
  self.placeId = initialData.place_id;
  self.name = initialData.name;
  self.type = initialData.type;
  self.formatted_address = initialData.formatted_address;
  self.icon = initialData.icon;
  self.marker = initialData.marker;
};

//the data for the type options
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
      location: loc,
      radius: 1500,
      type: [type]
    };

    service.nearbySearch(request, callbackFilter);
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
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  } //end setMapOnAll

  // Removes the markers from the map, and delete them from the marker array.
  function clearMarkers() {
    setMapOnAll(null);
    markers = [];
  }


} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);

