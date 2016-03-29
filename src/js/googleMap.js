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


// Overall viewmodel for the map with a init function
function MapViewModel() {
    var self = this;
    var storedSpecialItem = localStorage.getItem('specialItem'); //the stored value of special search input

    self.placeList = ko.observableArray([]); //the list of places to be displayed in the map

    initialPlaces.forEach(function(placeItem) { //noneditable data of initial places to be put in the map whenever it is reloaded
        self.placeList.push(new MapData(placeItem)); //populate the placeList with objects to be displayed
    });


    self.typeList = ko.observableArray([]); // the list of types to be filtered


    availableTypes.forEach(function(typeItem) { // noneditable data of types to be filtered
        self.typeList.push(typeItem); //all items are put in the typelist
    });

    //the selected type from the filter, could be more than one,
    //set up for multiple selections but I found the interface not userfriendly so I made it single selection
    self.selectedTypes = ko.observableArray();

    // filter the markers on the map with the selectedTypes and
    // update the placeList with the new places
    self.selectedTypes.subscribe(function(newTypes) {
        var typeArray = [];
        newTypes.forEach(function(newType) {
            typeArray.push(newType.type);
        });
        self.placeList().length = 0; //empty the self.placeList array
        filter(typeArray); //filter the mapMarkers and the wiew list to the selected type
    });


    self.currentPlace = ko.observable(); //the clicked list item

    //the user input from special place
    self.specialPlace = ko.observable(storedSpecialItem); //use the stored value in locastorage if available


    self.specialPlace.subscribe(function(specialItem) { //whenever something is written in the special search input window
        self.placeList().length = 0; //empty the self.placeList array
        specialSearch(specialItem); //call the function specialSearch with the variable specialItem
        localStorage.setItem('specialItem', specialItem); //set the new special search item to localStorage
    });

    self.filterInput = ko.observable(); //input from user to filter in existing list

    //filter through the names in the listView. So only text matches would work. So "berli" would return anything with the word "berli" in the title, which includes "Berlin."
    self.filterList = ko.computed(function() {
        var listArray = [];
        var originList = self.placeList(); //the original list array
        var searchstring = self.filterInput(); //the user input to filter
        var regExp = new RegExp(searchstring, "i")

        originList.forEach(function(onePlace) {
            var string = onePlace.name; //the name that appears in the list
            var result = string.search(regExp) //an insensitive search in the string for the userinput
            if (result !== -1) { //if there is no string match the result will be -1
                listArray.push(onePlace); //put all onePlace wich matches filter input in the list
            }
        })
        console.log(listArray);
        return listArray

    }); //since placeList was defined and used first I kept that

} //end MapViewModel

var model = new MapViewModel();

ko.applyBindings(model);
