var currentLocation = require('./../js/currentLocation.js');

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10
  });
}
$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', initMap);
  $('#locateUser').click(currentLocation);
});
