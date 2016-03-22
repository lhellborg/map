// the initial places
var initialPlaces = [{
    name: "Fischers Fritz",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    place_id: "ChIJN-CrHttRqEcRW8WVxZ0PUDk",
    type: "restaurant",
    formatted_address: "Charlottenstraße 49, 10117 Berlin, Tyskland"
}, {
    name: "Lutter & Wegner",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    place_id: "ChIJn3aH2MtRqEcRFCq5E46U1Zs",
    type: "restaurant",
    formatted_address: "Weinhaus Huth, Alte Potsdamer Str. 5, 10785 Berlin, Tyskland"
}, {
    name: "Maritim Hotel Berlin",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
    place_id: "ChIJVW_VXbRRqEcROfZizUmpRGA",
    type: "hotel",
    formatted_address: "Stauffenbergstraße 26, 10785 Berlin, Tyskland"
}, {
    name: "Brandenburger Tor",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
    place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY",
    type: "establishment",
    formatted_address: "Pariser Platz, 10117 Berlin, Tyskland"
}, {
    name: "Reichstagsgebäude",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/civic_building-71.png",
    place_id: "ChIJbVDuQcdRqEcR5X3xq9NSG2Q",
    type: "establishment",
    formatted_address: "Platz der Republik 1, 11011 Berlin, Tyskland"
}, {
    name: "Gendarmenmarkt",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
    place_id: "ChIJ4ZsybtpRqEcRkDdXJvRC7Wk",
    type: "establishment",
    formatted_address: "Gendarmenmarkt, 10117 Berlin, Tyskland"
}, {
    name: "Deutscher Dom",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_general-71.png",
    place_id: "ChIJ4ZsybtpRqEcRqBX6VAnUoAw",
    type: "church",
    formatted_address: "Gendarmenmarkt 1-2, 10117 Berlin, Tyskland"
}, {
    name: "Kaiser-Wilhelm-Gedächtnis-Kirche",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_general-71.png",
    place_id: "ChIJd2v8Cf9QqEcRnLCe4snacBA",
    type: "church",
    formatted_address: "Breitscheidplatz, 10789 Berlin, Tyskland"
}, {
    name: "Gedenkstätte Berliner Mauer",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
    place_id: "ChIJZ0KxF_JRqEcRrLHB-4r-U-o",
    type: "establishment",
    formatted_address: "Bernauer Str. 111, 13355 Berlin, Tyskland"
}];

// available types to search for in the filter menu, preferably from the server
var availableTypes = [{
    name: "default from google",
    type: ""
}, {
    name: "Accounting",
    type: "accounting"
}, {
    name: "Airport",
    type: "airport"
}, {
    name: "Amusement park",
    type: "amusement_park"
}, {
    name: "Aquarium",
    type: "aquarium"
}, {
    name: "Art gallery",
    type: "art_gallery"
}, {
    name: "ATM",
    type: "atm"
}, {
    name: "Bakery",
    type: "bakery"
}, {
    name: "Bank",
    type: "bank"
}, {
    name: "Bar",
    type: "bar"
}, {
    name: "Beauty salon",
    type: "beauty_salon"
}, {
    name: "Bicycle store",
    type: "bicycle_store"
}, {
    name: "Book store",
    type: "book_store"
}, {
    name: "Bowling alley",
    type: "bowling_alley"
}, {
    name: "Bus station",
    type: "bus_station"
}, {
    name: "Cafe",
    type: "cafe"
}, {
    name: "Campground",
    type: "campground"
}, {
    name: "Car dealer",
    type: "car_dealer"
}, {
    name: "Car rental",
    type: "car_rental"
}, {
    name: "car repair",
    type: "car_repair"
}, {
    name: "car wash",
    type: "car_wash"
}, {
    name: "Casino",
    type: "casino"
}, {
    name: "Cemetery",
    type: "cemetery"
}, {
    name: "Church",
    type: "church"
}, {
    name: "City hall",
    type: "city_hall"
}, {
    name: "Clothing store",
    type: "clothing_store"
}, {
    name: "Convenience store",
    type: "convenience_store"
}, {
    name: "Courthouse",
    type: "courthouse"
}, {
    name: "Dentist",
    type: "dentist"
}, {
    name: "Department store",
    type: "department_store"
}, {
    name: "Doctor",
    type: "doctor"
}, {
    name: "Electrician",
    type: "electrician"
}, {
    name: "Electronics store",
    type: "electronics_store"
}, {
    name: "Embassy",
    type: "embassy"
}, {
    name: "Fire station",
    type: "fire_station"
}, {
    name: "Florist",
    type: "florist"
}, {
    name: "Funeral home",
    type: "funeral_home"
}, {
    name: "Furniture store",
    type: "furniture_store"
}, {
    name: "Gas station",
    type: "gas_station"
}, {
    name: "Grocery or Supermarket",
    type: "grocery_or_supermarket"
}, {
    name: "Gym",
    type: "gym"
}, {
    name: "Hair care",
    type: "hair_care"
}, {
    name: "Hardware store",
    type: "hardware_store"
}, {
    name: "Hindu temple",
    type: "hindu_temple"
}, {
    name: "Home goods store",
    type: "home_goods_store"
}, {
    name: "Hospital",
    type: "hospital"
}, {
    name: "Insurance agency",
    type: "insurance_agency"
}, {
    name: "Jewelry store",
    type: "jewelry_store"
}, {
    name: "Laundry",
    type: "laundry"
}, {
    name: "Lawyer",
    type: "lawyer"
}, {
    name: "Library",
    type: "library"
}, {
    name: "Liquor store",
    type: "liquor_store"
}, {
    name: "Local government office",
    type: "local_government_office"
}, {
    name: "Locksmith",
    type: "locksmith"
}, {
    name: "Lodging",
    type: "lodging"
}, {
    name: "Meal delivery",
    type: "meal_delivery"
}, {
    name: "Meal takeaway",
    type: "meal_takeaway"
}, {
    name: "Mosque",
    type: "mosque"
}, {
    name: "Movie rental",
    type: "movie_rental"
}, {
    name: "Movie theater",
    type: "movie_theater"
}, {
    name: "Moving company",
    type: "moving_company"
}, {
    name: "Museum",
    type: "museum"
}, {
    name: "Night club",
    type: "night_club"
}, {
    name: "Painter",
    type: "painter"
}, {
    name: "Park",
    type: "park"
}, {
    name: "Parking",
    type: "parking"
}, {
    name: "Pet store",
    type: "pet_store"
}, {
    name: "Pharmacy",
    type: "pharmacy"
}, {
    name: "Physiotherapist",
    type: "physiotherapist"
}, {
    name: "Plumber",
    type: "plumber"
}, {
    name: "Police",
    type: "police"
}, {
    name: "Post office",
    type: "post_office"
}, {
    name: "Real estate agency",
    type: "real_estate_agency"
}, {
    name: "Restaurant",
    type: "restaurant"
}, {
    name: "Roofing contractor",
    type: "roofing_contractor"
}, {
    name: "RV park",
    type: "rv_park"
}, {
    name: "School",
    type: "school"
}, {
    name: "Shoe store",
    type: "shoe_store"
}, {
    name: "Shopping mall",
    type: "shopping_mall"
}, {
    name: "Spa",
    type: "spa"
}, {
    name: "Stadium",
    type: "stadium"
}, {
    name: "Storage",
    type: "storage"
}, {
    name: "Store",
    type: "store"
}, {
    name: "Subway station",
    type: "subway_station"
}, {
    name: "Synagogue",
    type: "synagogue"
}, {
    name: "Taxi stand",
    type: "taxi_stand"
}, {
    name: "Train station",
    type: "train_station"
}, {
    name: "Transit station",
    type: "transit_station"
}, {
    name: "Travel agency",
    type: "travel_agency"
}, {
    name: "University",
    type: "university"
}, {
    name: "Veterinary care",
    type: "veterinary_care"
}, {
    name: "Zoo",
    type: "zoo"
}];
