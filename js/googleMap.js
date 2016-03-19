
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

  //the selected type from the filter
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

  //the user input from special place?
  self.specialPlace = ko.observable();

  self.specialPlace.subscribe(function(specialItem) {
    console.log(specialItem);
      //empty the self.placeList array
    self.placeList().length = 0;
    specialSearch(specialItem);
  });

} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);

