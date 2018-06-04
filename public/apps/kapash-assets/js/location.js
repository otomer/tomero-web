/**************/
/*** LOCATION ***/
/**************/
(function () {
    'use strict';

    var locationStatus = {
        VALID: 0,
        NOT_SUPPORTED: 1,
        DENIED: 2
    }

    var LocationModule = function () {
        var _privates = {}

        var onStatusChange = function (location, status) {

        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, errorHandler);

            } else {
                onStatusChange(null, locationStatus.NOT_SUPPORTED);
                console.log("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            var now = new Date();
            console.log(now.toISOString() + ". (Latitude " + position.coords.latitude + ", Longitude " + position.coords.longitude + ")");
            onStatusChange(position, locationStatus.VALID);
        }

        function errorHandler(error) {
            // error passed to function
            //handle condition where position is not available
            //more specifically you can check the error code...
            //error.code == 1
            if (error.PERMISSION_DENIED) {
                console.log("Geolocation denied");
                onStatusChange(null, locationStatus.DENIED);
            }
        }

        var init = function (options) {
            getLocation();
            onStatusChange = function (location, status) {
                if (options.onStatusChange) {
                    options.onStatusChange(location, status);
                }
            }
        }


        return {
            init: init,
            onStatusChange: onStatusChange,
            getLocation: getLocation
        }
    }

    LocationModule.Status = locationStatus;
    window.Location = LocationModule;
}())