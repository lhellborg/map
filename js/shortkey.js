
//trigger an event after pressing a key:

document.addEventListener('keyup', function(e) {

  var e = e || window.event; // for IE to cover IEs window event-object
  if (e.altKey && e.which == 65) { //In this example press 'ALT + a'
    var thaiFood = "thai food";
    model.specialPlace(thaiFood);
    return false;
  }
   if (e.altKey && e.which == 83) { //In this example press 'ALT + s'
    var emergency = "emergency";
    model.specialPlace(emergency);
    return false;
  }
});