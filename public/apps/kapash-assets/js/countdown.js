/******************/
/*** COUNT DOWN ***/
/******************/
(function () {
    'use strict';

    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;

    }
     
    function formatTwoDigits(n) {
        return n < 10 ? '0' + n : n;
    }

    function formatTime(h, m) {
        return formatTwoDigits(h) + ":" + formatTwoDigits(m);
    }

    var ONE_DAY_SECONDS = 24 * 60 * 60;

    var CountdownModule = function () {
        var _privates = {
            elementCountdownId: "countdown",
            elementTimeId: "time",
            interval : null,
            targetHour: 14,
            targetMinutes: 30
        }

        document.getElementById(_privates.elementTimeId).innerText = formatTime(_privates.targetHour, _privates.targetMinutes);

        var targetTime = new Date();
        var now = new Date().getTime();
        targetTime.setHours(_privates.targetHour, _privates.targetMinutes, 0);
        var marginTime = targetTime - now;
        if (marginTime < 0) {
            targetTime = targetTime.addDays(1);
        }

        var timeLeft = function (onStart) {
            var now = new Date().getTime();
            var timeLeftDelta = targetTime - now;
            var daysLeft = Math.floor(timeLeftDelta / (1000 * 60 * 60 * 24));
            var hoursLeft = Math.floor((timeLeftDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutesLeft = Math.floor((timeLeftDelta % (1000 * 60 * 60)) / (1000 * 60));
            var secondsLeft = Math.floor((timeLeftDelta % (1000 * 60)) / 1000);

            if (onStart) {
                var onStartSecTotalLeft = timeLeftDelta / 1000;
                var onStartPercentDone = ((ONE_DAY_SECONDS - onStartSecTotalLeft) / ONE_DAY_SECONDS) * 100;

                var onStartPercentDone2 = (onStartPercentDone / 100) * 95;
                var onStartPercentLeft = 100 - onStartPercentDone2;
                var onStartSecondsPassedInDay = ONE_DAY_SECONDS - onStartSecTotalLeft;

                console.log("Seconds in one day: " + ONE_DAY_SECONDS);
                console.log("On Start, Total Seconds passed: " + onStartSecondsPassedInDay);
                console.log("On Start, Total Seconds Until: " + onStartSecTotalLeft);
                console.log("On Start, Total Percent passed: " + Math.floor(onStartPercentDone));

                //Dynamic CSS
                var css = "animation: coffeeGoesUp 2 forwards " + ONE_DAY_SECONDS + "s linear;"
                var css2 = "-webkit-" + css;
                var css3 = "animation-delay: -" + onStartSecondsPassedInDay + "s !important;";
                css3 = "";
                document.querySelector('head').innerHTML += `<style>
                @-webkit-keyframes coffeeGoesUp {
                    0% {
                      top: ${onStartPercentLeft}%;
                    }
                    80%,
                    100% {
                      top: 5%;
                    }
                  }
                  
                  @keyframes coffeeGoesUp {
                    0% {
                      top: ${onStartPercentLeft}%;
                    }
                    80%,
                    100% {
                      top: 5%;
                    }
                  }
                    </style>`;

                var coffeeElement = document.getElementsByClassName("coffee");
                coffeeElement[0].style = css2 + css + css3;
            }

            var daysRes = daysLeft + " ימים ";
            document.getElementById(_privates.elementCountdownId).innerHTML = hoursLeft + " שעות, " + minutesLeft + " דקות ו-" + secondsLeft + " שניות ";

            if (timeLeftDelta < 0) {
                clearInterval(_privates.interval);
                document.getElementById(_privates.elementCountdownId).innerHTML = "הגיע הזמן!";
            }
        }

        var init = function () {
            timeLeft(true);
            _privates.interval = setInterval(function () {
                timeLeft();
            }, 1000);
        }

        return {
            init: init
        }
    }

    window.Countdown = CountdownModule;
}())