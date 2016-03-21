
//trigger an event after pressing a key:
//In this example press 'ALT + a'
document.addEventListener('keyup', function(e) {

  var e = e || window.event; // for IE to cover IEs window event-object
  if (e.altKey && e.which == 65) {
    var police = [{name: "Police", type: "police"}];
    model.selectedTypes(police);
    return false;
  }
});