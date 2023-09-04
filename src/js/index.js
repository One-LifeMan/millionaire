'use strict'

// import "./modules/swiper";

const QUESTIONS_NUMBER_STR = [
    "<span>Перше</span> питання:",
    "Питання № <span>два</span>:",
    "Переходимо до <span>Третього</span> питання:",
    "І так. <span>Четверте</span> питання:",
    "Якщо ви не відповісте на наступне питання, то ми з вами попрощаємся. <span>П'яте</span> питання:",
    "<span>шосте</span>",
    "<span>сьоме</span>",
    "<span>восьме</span>",
    "<span>дев'яте</span>",
    "<span>десяте</span>",
    "<span>одинадцяте</span>",
    "<span>дванадцяте</span>",
    "<span>тринадцяте</span>",
    "<span>чотирнадцяте</span>",
    "<span>останнє</span>",
];

const QUESTIONS_OBJECT = {
    question1: {
        question: "Коли було проголошено незалежність України?",
        answers: [
            "1991",
            "1944",
            "1917",
            "1676",
        ],
        answerCorrect: "1991",
    },
    question2: {
        question: "Яке місто є столицею України?",
        answers: [
            "Львів",
            "Київ",
            "Одеса",
            "Харків",
        ],
        answerCorrect: "Київ",
    },
    question3: {
        question: "Хто написав 'Енеїду' українською мовою в 1798 році?",
        answers: [
            "Іван Котляревський",
            "Тарас Шевченко",
            "Леся Українка",
            "Іван Франко",
        ],
        answerCorrect: "Іван Котляревський",
    },
    question4: {
        question: "Яке прізвище у Тараса Шевченка?",
        answers: [
            "Григорович",
            "Миколайчук",
            "Захарченко",
            "Шевченко",
        ],
        answerCorrect: "Шевченко",
    },
    question5: {
        question: "Скільки областей в Україні?",
        answers: [
            "25",
            "28",
            "32",
            "33",
        ],
        answerCorrect: "28",
    },
    question6: {
        question: "Ким за професією був Зеленський Володимир до того як стати президентом?",
        answers: [
            "Юристом",
            "Лікарем",
            "Вчителем",
            "Актором і коміком",
        ],
        answerCorrect: "Актором і коміком",
    },
    question7: {
        question: "Як називається найвища гора України?",
        answers: [
            "Говерла",
            "Близниці",
            "Піп Іван",
            "Бребенескул",
        ],
        answerCorrect: "Говерла",
    },
    question8: {
        question: "Хто є автором збірки 'Кобзар'?",
        answers: [
            "Тарас Шевченко",
            "Леся Українка",
            "Іван Франко",
            "Пантелеймон Куліш",
        ],
        answerCorrect: "Тарас Шевченко",
    },
    question9: {
        question: "У якому році відбулася Помаранчева революція в Україні?",
        answers: [
            "2004",
            "2009",
            "1999",
            "2014",
        ],
        answerCorrect: "2004",
    },
    question10: {
        question: "Хто є автором роману 'Чорна рада'?",
        answers: [
            "Пантелеймон Куліш",
            "Михайло Коцюбинський",
            "Іван Нечуй-Левицький",
            "Іван Франко",
        ],
        answerCorrect: "Пантелеймон Куліш",
    },
    question11: {
        question: "Кого вважають засновником Києва?",
        answers: [
            "Кия",
            "Аскольда",
            "Дира",
            "Щека",
        ],
        answerCorrect: "Кия",
    },
    question12: {
        question: "Якому місту належить назва 'місто левів'?",
        answers: [
            "Львів",
            "Тернопіль",
            "Вінниця",
            "Черкаси",
        ],
        answerCorrect: "Львів",
    },
    question13: {
        question: "Хто написав 'Заповіт', один з найвідоміших віршів Шевченка?",
        answers: [
            "Тарас Шевченко",
            "Іван Франко",
            "Леся Українка",
            "Максим Рильський",
        ],
        answerCorrect: "Тарас Шевченко",
    },
    question14: {
        question: "Коли Україна прийняла першу Конституцію як незалежна держава?",
        answers: [
            "1996",
            "1991",
            "2004",
            "2010",
        ],
        answerCorrect: "1996",
    },
    question15: {
        question: "Як називається найбільший стадіон Києва?",
        answers: [
            "Олімпійський",
            "Динамо",
            "Арена Львів",
            "Металіст",
        ],
        answerCorrect: "Динамо",
    },
};

const PRIZE_MONEY = [
    0,
    100,
    500,
    1000,
    2000,
    5000,
    10000,
    20000,
    30000,
    40000,
    50000,
    75000,
    150000,
    200000,
    500000,
    1000000
];

// const FIREPROOF_SUMS = [5, 10, 15];


const LEFT_COLUMN   = document.querySelector(".left_column");
const INFO_BLOCK    = document.querySelector(".info_block");
const QUESTIONS     = document.querySelector("#question");
const ANSWERS       = document.querySelectorAll(".answer_wrap__answer");
const ANSWERS_BLOCK = document.querySelector(".answers_block");
const POPUP         = document.querySelector(".popup");


let counterQuestions = 1;
// let correctAnswersCount = 0;
const MAX_COUNTER_QUESTION = Object.keys(QUESTIONS_OBJECT).length;

ANSWERS_BLOCK.addEventListener("click", (e) => {
    let elem;
    if(e.target.classList.contains('answer_wrap')) {
        elem = e.target;
    } else if(e.target.closest('.answer_wrap')) {
        elem = e.target.closest('.answer_wrap');
    } else if(e.target.parentNode.classList.contains('answer_wrap')) {
        elem = e.target.parentNode;
    };
    answerCheck(elem);
});

function fillLeftBlock() {
    let ol = document.createElement("ol");
    ol.classList.add("left_column__list");
    ol.setAttribute("reversed", "");

    for (let i = 1; i < PRIZE_MONEY.length; i++) {
        const price = PRIZE_MONEY[i];
        let li = document.createElement("li");
        li.classList.add("left_column__item");
        let number = document.createElement("span");
        number.classList.add("left_column__number");
        number.textContent = i;
        li.append(number);
        let money = document.createElement("span");
        money.classList.add("left_column__money");
        money.textContent = price;
        li.append(money);
        ol.prepend(li);
    }

    LEFT_COLUMN.append(ol);
};

function fillRightBlock() {
    INFO_BLOCK.innerHTML = QUESTIONS_NUMBER_STR[counterQuestions - 1];

    QUESTIONS.textContent = QUESTIONS_OBJECT["question" + counterQuestions].question;
    
    for (let i = 0; i < ANSWERS.length; i++) {
        const answerProperty = ANSWERS[i];
        for (let j = 0; j < 1; j++) {
            const answerValue = QUESTIONS_OBJECT["question" + counterQuestions].answers[i];
            answerProperty.textContent = answerValue;
        };
    };
};

function backlightMoney() {
    let items = Array.from(LEFT_COLUMN.querySelectorAll(".left_column__item"));

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.classList.remove("item_active");
    }

    items.reverse()[counterQuestions - 1].classList.add("item_active");

};

function popupMessage(sms) {
    let message = POPUP.querySelector(".popup__message");
    let btn = POPUP.querySelector(".popup__btn");

    message.textContent = sms;

    POPUP.classList.remove("none");

    btn.addEventListener("click", () => {
        POPUP.classList.add("none");
        counterQuestions = 1;
        // correctAnswersCount = 0;
        // fillLeftBlock();
        fillRightBlock();
        backlightMoney();
    });
};

function popup(result) {
    
    if (result) {
        popupMessage(`Вітаю! Ви відповіли на ${counterQuestions} запитань та виграли ${PRIZE_MONEY[counterQuestions]} гривень!`);
    } else {
        if ( counterQuestions < 5 ) {
            popupMessage(`Відпровідь не вірна! Ви програли!`);
        } else if ( counterQuestions > 5 && counterQuestions < 10 ) {
            popupMessage(`Відпровідь не вірна! Ви програли гру, але відповіли на ${counterQuestions - 1} запитань та виграли ${PRIZE_MONEY[5]} гривень!`);
        } else if ( counterQuestions > 10 && counterQuestions < 15 ) {
            popupMessage(`Відпровідь не вірна! Ви програли гру, але відповіли на ${counterQuestions - 1} запитань та виграли ${PRIZE_MONEY[10]} гривень!`);
        };
    };
};


/*
ANSWERS.forEach((answer) => {
    let elem = answer.parentElement.parentElement;
    elem.addEventListener("click", () => {
        answerCheck(elem);
    });
});
*/

function answerCheck(elem) {
    let clickAnswer = elem.getElementsByClassName("answer_wrap__answer")[0].textContent;
    let result = clickAnswer === QUESTIONS_OBJECT["question" + counterQuestions].answerCorrect ? true : false;
    
    if (result) {
        // correctAnswersCount++
    } else {
        popup(result);
        return;
    };
    console.log(result);
    // console.log(correctAnswersCount);

    counterQuestions < MAX_COUNTER_QUESTION ? counterQuestions++ : popup(result);
    fillRightBlock();
    backlightMoney();
};




fillLeftBlock();
fillRightBlock();
backlightMoney();