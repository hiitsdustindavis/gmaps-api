
exports.initMap = function() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -0, lng: 0},
      zoom: 3
  });
  directionsDisplay.setMap(map);
  var onChangeHandler = function() {
    exports.calculateAndDisplayRoute(directionsService, directionsDisplay);
  };


  document.getElementById('end').addEventListener('change', onChangeHandler);
};

function geocodeLatLng(input1) {
  var output;
  var done = false;
  var latlng = input1;
  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        console.log(results[1].formatted_address);
        output = results[1].formatted_address;
        done = true;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
  
  console.log("hey this one" + output);
  return output;
}

exports.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {


  directionsService.route({
    origin: geocodeLatLng(userLatLng),
    destination: document.getElementById('end').value,

    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

exports.locateUser = function() {
    // If the browser supports the Geolocation API
    if (navigator.geolocation){
      var positionOptions = {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
      };
      navigator.geolocation.getCurrentPosition(exports.geolocationSuccess, exports.geolocationError, positionOptions);
    }
    else {
      alert("Your browser doesn't support the Geolocation API");
    }

  // this is the success callback from telling the navigator (your browser) to get the current user's position
  // we do this on line 13 above. We pass in a function to call on success, a function to call on error, and some options to tell the geolocation api how we want it to run.
  // on successfully locating the user, geolocationSuccess() gets called automatically, and it is passed the user's position as an argument.
  // on error, geolocationError is called.
};

exports.geolocationSuccess = function(position) {

  // here we take the `position` object returned by the geolocation api
  // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
  // it 2 arguments: one for latitude, one for longitude.
  // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
  // But you must use coordinates to use this method.

 userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


  var myOptions = {
    zoom : 16,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP

  };
  // Draw the map - you have to use 'getElementById' here.
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  // Place the marker
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
};

exports.geolocationError = function(positionError)
{
    console.log(positionError);

};
