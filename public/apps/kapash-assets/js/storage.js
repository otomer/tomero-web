/******************/
/*** COUNT DOWN ***/
/******************/
(function () {
    'use strict';

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    var StorageModule = function () {
        var _privates = {
            keyName: 'KapashUser',
            elementSelector: ".user-welcome"
        }

        function renderYou(item) {
            var profile = item.results[0];
            var info = item.info;

            var x = $(_privates.elementSelector);
            x.find(".your-pic").attr('src', profile.picture.medium);
            x.find(".your-name").html(profile.name.first.capitalize());
            x.find('.temp-guid').html(info.seed);
            x.show();
        }

        function generateUser() {
            return $.ajax({
                url: 'https://randomuser.me/api/',
                dataType: 'json'
            });
        }

        var init = function () {
            var item = localStorage.getItem(_privates.keyName);
            var userItem;

            if (item) {
                console.log("User exist");
                userItem = JSON.parse(item);
                renderYou(userItem);
            } else {
                console.log("User not exist");
                generateUser().done(function (data) {
                    userItem = data;
                    localStorage.setItem(_privates.keyName, JSON.stringify(userItem));
                    renderYou(userItem);
                });
            }
            console.log("LocalStorage Item: ", userItem);
        }

        return {
            init: init
        }
    }

    window.Storage = StorageModule;
}())