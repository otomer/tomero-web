/******************/
/*** COUNT DOWN ***/
/******************/
(function () {
    'use strict';

    var MenuModule = function () {
        var items = {
            location: {
                itemIndex: 0,
            },
            weather: {
                itemIndex: 2
            }
        }
        var init = function (options) {
            var $page = $('.page');

            $('.menu_toggle').on('click', function () {
                $page.toggleClass('shazam');
            });
            $('.content').on('click', function () {
                $page.removeClass('shazam');
            });

            if (options.locationClick) {
                setClick(items.location.itemIndex, options.locationClick);
            }
            if (options.weatherClick) {
                setClick(items.weather.itemIndex, options.weatherClick);
            }


        }

        var toggleItem = function (idx, status) {
            var elem = $($('.menu_items li')[idx]);
            var css = 'active-true';
            if (status) {
                elem.addClass(css);
            } else {
                elem.removeClass(css);
            }
        }

        var menuItem = function (idx) {
            return $($('.menu_items li')[idx]);
        }
        var setClick = function (idx, clickEvent) {
            menuItem(idx).click(clickEvent);
        }



        return {
            init: init,
            items: {
                location: {
                    toggle: function (status) {
                        toggleItem(items.location.itemIndex, status);
                    },

                },
                weather: {
                    setImage: function (imageUrl) {
                        toggleItem(this.itemIndex, true);
                        var icon = menuItem(items.weather.itemIndex).find("i");
                        icon.removeClass("fa-ban");
                        icon.addClass("fa-fw");
 
                    }
                }

            }
        }
    }

    window.Menu = MenuModule;
}())