import { language } from "./script.js";

const greetingPage = document.querySelector('.greeting');
const namePage = document.querySelector('.name');

let date = new Date();
let hours = date.getHours();

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
namePage.addEventListener('change', isEmptyName);

updateGreeting();

function updateTime() {
    date = new Date();
    hours = date.getHours();
    return hours;
}

function getTimeOfDay() {
    let timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
    return timeOfDay[Math.trunc(updateTime() / 6)];
}

function updateGreeting() {
    let russianTranslate = getTimeOfDay() === 'night' ? 'Доброй ночи' : getTimeOfDay() === 'morning' ? 'Доброе утро' : getTimeOfDay() === 'afternoon' ? 'Добрый день' : 'Добрый вечер'
    greetingPage.innerText = language === 'en' ? `Good ${getTimeOfDay()}` : `${russianTranslate}`;
    setTimeout(updateGreeting, 1000);
}

function setLocalStorage() {
    localStorage.setItem('name', namePage.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        namePage.value = localStorage.getItem('name');
    } else isEmptyName();
}

function isEmptyName() {
    if (!namePage.value && language === 'en') {
        namePage.placeholder = '[Enter name]';
    } else if (!namePage.value && language === 'ru') {
        namePage.placeholder = '[Введите имя]';
    }
}

export {getTimeOfDay, updateGreeting, isEmptyName};