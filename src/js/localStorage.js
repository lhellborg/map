//to test if localStorage is available
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

//give a message to the user if localStorage is available or not, only shown when width is more than 450 px
if (storageAvailable('localStorage')) {
    $("footer").prepend("<p>The text you put in special place will be saved for next time</p>");
} else {
    $("footer").prepend("<p>Sorry, we can't save your special search until next login</p>");
}
