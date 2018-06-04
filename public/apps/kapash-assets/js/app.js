document.addEventListener("DOMContentLoaded", function () {
    var footer = new Footer();
    var countdown = new Countdown();
    var storage = new Storage();
    var menu = new Menu();
    var location = new Location();
    var weather = new Weather();

    storage.init();
    countdown.init();
    footer.init();

    menu.init({
        locationClick : location.getLocation,
        // weatherClick: location.getLocation
    });
   
    location.init({
        onStatusChange: function (position, status) {
            menu.items.location.toggle(position ? true : false);
            if (position) {
                weather.update(position.coords.latitude, position.coords.longitude);

            }
        }
    });

    weather.init({
        onSuccess: function (imageUrl) {
            menu.items.weather.setImage(imageUrl);
            
        }
    })
});