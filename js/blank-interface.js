var currentLocation = require('./../js/currentLocation.js');
var routeFinder = require('./../js/routeFinder.js');

$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', currentLocation.initMap);
  $('#locateUser').click(currentLocation.locateUser);
});
