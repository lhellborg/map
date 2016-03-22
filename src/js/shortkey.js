//trigger an event after pressing a key:

document.addEventListener('keyup', function(e) {

    e = e || window.event; // for IE to cover IEs window event-object
    if (e.altKey && e.which == 65) { //press 'ALT + a'
        var thaiFood = "thai food";
        model.specialPlace(thaiFood); //thai food will be searched for with specialPlace function
        return false;
    }
    if (e.altKey && e.which == 83) { //press 'ALT + s'
        var emergency = "emergency";
        model.specialPlace(emergency); //emergency will be search for with specialPlace function
        return false;
    }
});
