/**************/
/*** FOOTER ***/
/**************/
(function () {
    'use strict';

    var FooterModule = function () {
        var _privates = {
            elementId: "quote",
            timeInSeconds: 20,
            quotes: [
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
                'האם עצרת אי פעם לחשוב: "האם הקפה מכור אליי?"',
                'מים הוא המרכיב האלמנטרי הכי חשוב בחיים בגלל שבלי מים אתה לא יכול להכין קפה',
                'אין קפה, אין עבודה',
                'כשהחיים נותנים לך לימונים, תחליף אותם בעבור קפה',
                'יום בלי קפה הוא כמו... סתם בצחוק, אני לא באמת יודע איך זה מרגיש',
                'אתמול ראיתי בחור יושב בקפה ארומה, בלי אייפון, בלי טאבלט, בלי לפטופ. הוא רק ישב שם ושתה קפה, כמו פסיכופט.'
            ]
        }

        var extractRandomItem = function (items) {
            return items[Math.floor(Math.random() * items.length)];
        }

        var setRandomItem = function () {
            document.getElementById(_privates.elementId).innerHTML = "\"" + extractRandomItem(_privates.quotes) + "\"";
        }

        var init = function () {
            setRandomItem();
            var y = setInterval(function () {
                setRandomItem();
            }, 1000 * _privates.timeInSeconds);
        }

        return {
            init: init
        }
    }

    window.Footer = FooterModule;
}())