/******************/
/*** COUNT DOWN ***/
/******************/
Date.prototype.addDays = function (days) { var dat = new Date(this.valueOf()); dat.setDate(dat.getDate() + days); return dat; }
var countdownElementId = "countdown";
var targetTime = new Date();
var ONE_DAY_SECONDS = 24 * 60 * 60;
var now = new Date().getTime();
targetTime.setHours(15, 0, 0);
var marginTime = targetTime - now;
if (marginTime < 0) {
    targetTime = targetTime.addDays(1);
}
 
var timeLeft = function (onStart) {
    var now = new Date().getTime();
    var distance = targetTime - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (onStart) {
        var onStartSecTotalLeft = distance / 1000;
        var onStartPercentDone = ((ONE_DAY_SECONDS - onStartSecTotalLeft) / ONE_DAY_SECONDS) * 100;

        var onStartPercentDone2 = (onStartPercentDone / 100) * 95;
        var onStartPercentLeft = 100 - onStartPercentDone2;
        var onStartSecondsPassedInDay = ONE_DAY_SECONDS - onStartSecTotalLeft;

        console.log("Seconds in one day: " + ONE_DAY_SECONDS);
        console.log("On Start, Total Seconds passed: " + onStartSecondsPassedInDay);
        console.log("On Start, Total Seconds Until: " + onStartSecTotalLeft);
        console.log("On Start, Total Percent passed: " + Math.floor(onStartPercentDone));

        //CSS
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

            </style>
        `;

        var coffeeElement = document.getElementsByClassName("coffee");
        coffeeElement[0].style = css2 + css + css3;


    }

    var daysRes = days + " ימים ";
    document.getElementById(countdownElementId).innerHTML = hours + " שעות " + minutes + " דקות ו-" + seconds + " שניות ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById(countdownElementId).innerHTML = "הגיע הזמן!";
    }
}
timeLeft(true);
var x = setInterval(function () {
    timeLeft();
}, 1000);

/**************/
/*** FOOTER ***/
/**************/
var footerElementId = "quote";
var coffeeQuotes = [
    'זה אף פעם לא מאוחר מדי לעוד כוס קפה. אחרי הכל, זה תמיד בוקר במקום כלשהו ברחבי העולם.',
    'פיהוק הוא בעצם צעקה שקטה לקפה.',
    'אם אתה חושב שהגודל לא קובע, אני אשמח להכין לך קפה בכוס של צ\'ייסר...',
    'אני חושב שיהיו הרבה פחות מלחמות בעולם אם יחוקק "חוק קפה חינם" גלובלי',
    'ניסיתי לעבור מקפה לתה אבל זה לא השתלב עם הבוז שאני חש מצד כל האנשים שעובדים איתי במשרד',
    'בואו נודה על האמת, קפה זו הסיבה היחידה בגללה יצאתי מהמיטה בבוקר',
    'אני כל הזמן מתבלבל בין קפה להתלהבות',
    'יודעים מה הולך ממש טוב עם הקפה? עוד כוס קפה.',
    'בכל פעם שאני מסיים לשתות את הקפה אני מביט בתחתית שלו ושואל את עצמי את אותה שאלה, "למה לעזאזל אני ער?"',
    'אני מודד את חיי בכפיות קפה.',
    'אתמול ראיתי בחור יושב בקפה ארומה, בלי אייפון, בלי טאבלט, בלי לפטופ. הוא רק ישב שם ושתה קפה, כמו פסיכופט.'
]
var getRandomItem = function (items) {
    var item = items[Math.floor(Math.random() * items.length)];
    return item;
}

var setRandomItem = function () {
    document.getElementById(footerElementId).innerHTML = "\"" + getRandomItem(coffeeQuotes) + "\"";
}
setRandomItem();
var y = setInterval(function () {
    setRandomItem();
}, 1000 * 20);