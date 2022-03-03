import { language } from "./script.js";

const timePage = document.querySelector(".time");
const datePage = document.querySelector(".date");

let date;
let currentTime;
let currentDate;

showTime();

function showTime() {
    date = new Date();
    currentTime = date.toLocaleTimeString();
    timePage.innerText = `${currentTime}`;
    setTimeout(showTime, 1000);
    showDate(date);
}

function showDate(date) {
    let options = {};
    if (language === 'en') {
        options = {weekday: 'long', month: 'long', day: 'numeric'};
        currentDate = date.toLocaleDateString('en-Br', options);
    }
    if (language === 'ru') {
        options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
        currentDate = date.toLocaleDateString('ru-RU', options);
    }
    datePage.innerText = `${currentDate}`;
}

export {showTime};