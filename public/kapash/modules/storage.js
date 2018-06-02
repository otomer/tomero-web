/******************/
/*** COUNT DOWN ***/
/******************/
(function () {
    'use strict';

    var StorageModule = function () {
        var _privates = {
            keyName: 'kUser'
        }


        //localStorage.setItem('testObject', JSON.stringify(testObject));

        var init = function () {
            var item = localStorage.getItem(_privates.keyName);
            var itemParsed = "<NO ITEM>";
            if (item) {
                itemParsed = JSON.parse(item)
            }
            console.log("LocalStorage Item: ", itemParsed);
        }

        return {
            init: init
        }
    }

    window.Storage = StorageModule;
}())