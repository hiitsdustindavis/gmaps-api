var currentLocation = require('./../js/currentLocation.js');


$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', currentLocation.initMap);
  $('#locateUser').click(currentLocation.locateUser);
});
