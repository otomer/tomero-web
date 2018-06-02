/**************/
/*** WEATHER ***/
/**************/
(function () {
    'use strict';

    var WeatherModule = function () {
        var _privates = {}

        var onSuccess = function () {}
        var init = function (options) {
            if (options.onSuccess) {
                onSuccess = options.onSuccess;
            }
        }

        var update = function (latitude, longitude) {
            var getUrl = function () {
                var percision = 2;
                return "https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&lat={0}&lon={1}&units=metric"
                    .replace("{0}", latitude.toFixed(percision))
                    .replace("{1}", longitude.toFixed(percision));
            }

            $.ajax({
                    dataType: "json",
                    url: getUrl(),
                })
                .done(function (data, textStatus, jqXHR) {
                    var iconUrl = "http://openweathermap.org/img/w/{0}.png"
                        .replace("{0}", data.weather[0].icon);

                    console.log(data.name + ": " + data.main.temp + " deg");
                    onSuccess(iconUrl);
                })
                .fail(function () {
                    console.log("Failed to get weather");
                });
        }
        return {
            init: init,
            update: update
        }
    }

    window.Weather = WeatherModule;
}())