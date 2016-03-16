// var currentMap = require('./../js/map.js');
var map;
function initMap() {
  var myLatLng = {lat: 20.363, lng: 131.044};

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', initMap);

});
