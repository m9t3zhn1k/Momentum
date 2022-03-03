import { getWeather, translateAll, setBgGH, getTimeOfDay, getRandomNum, setBgUnsplash, setBgFlickr } from './script.js';

const settingsOpenBtn = document.querySelector('.settings-icon');
const settingsPopup = document.querySelector('.settings__popup');
const settingsTags = document.querySelector('.settings__tags');
const settingsCloseBtn = document.querySelector('.setting__close-button');
const languageButtons = document.querySelectorAll('.language__label');
const backgroundButtons = document.querySelectorAll('.background__label');
const tagButtons = document.querySelectorAll('.tag__label');
const hiddenButtons = document.querySelectorAll('.hidden__label');
const settingsTitle = document.querySelector('.settings__title');
const settingsLangugageSubTitle = document.querySelector('.language__subtitle');
const settingsBackgroundSubTitle = document.querySelector('.background__subtitle');
const settingsTagsSubTitle = document.querySelector('.tags__subtitle');
const settingsHiddenSubTitle = document.querySelector('.hidden__subtitle');
const languageButtonEN = document.getElementById('en');
const languageButtonRU = document.getElementById('ru');
const backgroundBtnGitHub = document.getElementById('github_bcg');
const backgroundBtnUnsplash = document.getElementById('unsplash_bcg');
const backgroundBtnFlickr = document.getElementById('flickr_bcg');
const tagsBtnTimeOfDay = document.getElementById('timeofday');
const tagsBtnSport = document.getElementById('sport');
const tagsBtnScience= document.getElementById('science');

const playerHidden = document.querySelector('.player');
const playerBtnHidden = document.getElementById('playerHidden');
const quotesHidden = document.querySelector('.quotes');
const quotesBtnHidden = document.getElementById('quotesHidden');
const weatherHidden = document.querySelector('.weather');
const weatherBtnHidden = document.getElementById('weatherHidden');
const timeHidden = document.querySelector('.time');
const timeBtnHidden = document.getElementById('timeHidden');
const dateHidden = document.querySelector('.date');
const dateBtnHidden = document.getElementById('dateHidden');
const greetingHidden = document.querySelector('.greeting-container');
const greetingBtnHidden = document.getElementById('greetingHidden');


let language = localStorage.getItem('language') || 'en';
let backgroundSource = localStorage.getItem('backgroundSource') || 'github_bcg';
let tagActive = localStorage.getItem('tagActive') || 'timeofday';
let isHidden = {};
    isHidden.playerHidden = localStorage.getItem('playerHidden') || false;
    isHidden.quotesHidden = Boolean(localStorage.getItem('quotesHidden')) || false;
    isHidden.weatherHidden = Boolean(localStorage.getItem('weatherHidden')) || false;
    isHidden.timeHidden = Boolean(localStorage.getItem('timeHidden')) || false;
    isHidden.dateHidden = Boolean(localStorage.getItem('dateHidden')) || false;
    isHidden.greetingHidden = Boolean(localStorage.getItem('greetingHidden')) || false;

settingsOpenBtn.addEventListener('click', openSettings);
settingsOpenBtn.addEventListener('click', isChecked);
window.addEventListener('load', isChecked);
settingsOpenBtn.addEventListener('click', updateSettings);
settingsPopup.addEventListener('click', (event) => {
    closeSettingsOverlay();
});
settingsCloseBtn.addEventListener('click', closeSettings);
languageButtonEN.addEventListener('click', changeLanguage);
languageButtonRU.addEventListener('click', changeLanguage);
backgroundBtnGitHub.addEventListener('click', changeBackground);
backgroundBtnUnsplash.addEventListener('click', changeBackground);
backgroundBtnFlickr.addEventListener('click', changeBackground);
tagsBtnTimeOfDay.addEventListener('click', changeTag);
tagsBtnSport.addEventListener('click', changeTag);
tagsBtnScience.addEventListener('click', changeTag);
playerBtnHidden.addEventListener('click', hideElement);
quotesBtnHidden.addEventListener('click', hideElement);
weatherBtnHidden.addEventListener('click', hideElement);
timeBtnHidden.addEventListener('click', hideElement);
dateBtnHidden.addEventListener('click', hideElement);
greetingBtnHidden.addEventListener('click', hideElement);

function openSettings() {
    settingsPopup.classList.add('active');
}
function closeSettingsOverlay() {
    if (!event.target.closest('.settings__container')) {
        settingsPopup.classList.remove('active');
    };
}
function closeSettings() {
    settingsPopup.classList.remove('active');
}
function isChecked() {
    languageButtons.forEach(element => {
        if (element.childNodes[3].id == language) {
            element.style.background = '#93c47d';
        } else element.style.background = '#c7c7c7';
    });
    backgroundButtons.forEach(element => {
        if (element.childNodes[3].id == backgroundSource) {
            element.style.background = '#93c47d';
            if (element.childNodes[3].id == 'unsplash_bcg' || element.childNodes[3].id == 'flickr_bcg') {
                settingsTags.classList.add('active');
            } else settingsTags.classList.remove('active');
        } else element.style.background = '#c7c7c7';
    });
    tagButtons.forEach(element => {
        if (element.childNodes[3].id == tagActive) {
            element.style.background = '#93c47d';
        } else element.style.background = '#c7c7c7';
    });
    hiddenButtons.forEach(element => {
        if (isHidden[element.childNodes[3].id]) {
            element.classList.add('hidden');
            hideX(element.childNodes[3].id);
        }
    });
}

function changeLanguage() {
    language = this.id;
    localStorage.setItem('language', language);
    isChecked();
    translateAll(language);
}
function changeBackground() {
    backgroundSource = this.id;
    localStorage.setItem('backgroundSource', backgroundSource);
    isChecked();
    if (backgroundSource === 'github_bcg') {
        setBgGH(getTimeOfDay(), getRandomNum(1, 20));
    } else if (backgroundSource === 'unsplash_bcg') {
        setBgUnsplash(tagActive);
    } else if (backgroundSource === 'flickr_bcg') {
        setBgFlickr(tagActive);
    }
}
function changeTag() {
    tagActive = this.id;
    localStorage.setItem('tagActive', tagActive);
    isChecked();
    if (backgroundSource === 'github_bcg') {
        setBgGH(getTimeOfDay(), getRandomNum(1, 20));
    } else if (backgroundSource === 'unsplash_bcg') {
        if (tagActive == 'timeofday') {
            setBgUnsplash(getTimeOfDay());
        } else setBgUnsplash(tagActive);
    } else if (backgroundSource === 'flickr_bcg') {
        if (tagActive == 'timeofday') {
            setBgFlickr(getTimeOfDay());
        } else setBgFlickr(tagActive);
    }
}
function hideX(value) {
    let elem = document.getElementById(value);
    if (elem.id === 'playerHidden') playerHidden.classList.add('hidden');
    if (elem.id === 'quotesHidden') quotesHidden.classList.add('hidden');
    if (elem.id === 'weatherHidden') weatherHidden.classList.add('hidden');
    if (elem.id === 'timeHidden') timeHidden.classList.add('hidden');
    if (elem.id === 'dateHidden') dateHidden.classList.add('hidden');   
    if (elem.id === 'greetingHidden') greetingHidden.classList.add('hidden');
}
function hideElement() {
    if (this.id === 'playerHidden') {
        playerHidden.classList.toggle('hidden');
        this.parentNode.classList.toggle('hidden');
        playerHidden.classList.contains('hidden') ? isHidden[`playerHidden`] = true : isHidden[`playerHidden`] = "";
        localStorage.setItem('playerHidden', isHidden[`playerHidden`]);
    }
    if (this.id === 'quotesHidden') {
        quotesHidden.classList.toggle('hidden');
        this.parentNode.classList.toggle('hidden');
        quotesHidden.classList.contains('hidden') ? isHidden[`quotesHidden`] = true : isHidden[`quotesHidden`] = "";
        localStorage.setItem('quotesHidden', isHidden[`quotesHidden`]);
    }
    if (this.id === 'weatherHidden') {
        weatherHidden.classList.toggle('hidden');
        this.parentNode.classList.toggle('hidden');
        weatherHidden.classList.contains('hidden') ? isHidden[`weatherHidden`] = true : isHidden[`weatherHidden`] = "";
        localStorage.setItem('weatherHidden', isHidden[`weatherHidden`]);
    }
    if (this.id === 'timeHidden') {
        timeHidden.classList.toggle('hidden');
        this.parentNode.classList.toggle('hidden');
        timeHidden.classList.contains('hidden') ? isHidden[`timeHidden`] = true : isHidden[`timeHidden`] = "";
        localStorage.setItem('timeHidden', isHidden[`timeHidden`]);
    }
    if (this.id === 'dateHidden') {
        dateHidden.classList.toggle('hidden');
        this.parentNode.classList.toggle('hidden');
        dateHidden.classList.contains('hidden') ? isHidden[`dateHidden`] = true : isHidden[`dateHidden`] = "";
        localStorage.setItem('dateHidden', isHidden[`dateHidden`]);
    }
    if (this.id === 'greetingHidden') {
        greetingHidden.classList.toggle('hidden');
        this.parentNode.classList.toggle('hidden');
        greetingHidden.classList.contains('hidden') ? isHidden[`greetingHidden`] = true : isHidden[`greetingHidden`] = "";
        localStorage.setItem('greetingHidden', isHidden[`greetingHidden`]);
    }
}
function updateSettings() {
    backgroundBtnGitHub.previousElementSibling.textContent = 'GitHub';
    backgroundBtnUnsplash.previousElementSibling.textContent = 'Unsplash';
    backgroundBtnFlickr.previousElementSibling.textContent = 'Flickr';
    if (language === 'en') {
        settingsTitle.textContent = 'Settings';
        settingsLangugageSubTitle.textContent = 'Language';
        settingsBackgroundSubTitle.textContent = 'Background';
        settingsTagsSubTitle.textContent = 'Tags';
        settingsHiddenSubTitle.textContent = 'Display';
        languageButtonEN.previousElementSibling.textContent = 'EN';
        languageButtonRU.previousElementSibling.textContent = 'RU';
        tagsBtnTimeOfDay.previousElementSibling.textContent = 'Daytime';
        tagsBtnSport.previousElementSibling.textContent = 'Sport';
        tagsBtnScience.previousElementSibling.textContent = 'Science';
        playerBtnHidden.previousElementSibling.textContent = 'Player';
        quotesBtnHidden.previousElementSibling.textContent = 'Quotes';
        weatherBtnHidden.previousElementSibling.textContent = 'Weather';
        timeBtnHidden.previousElementSibling.textContent = 'Time';
        dateBtnHidden.previousElementSibling.textContent = 'Date';
        greetingBtnHidden.previousElementSibling.textContent = 'Greeting';
    }
    if (language === 'ru') {
        settingsTitle.textContent = 'Настройки';
        settingsLangugageSubTitle.textContent = 'Язык';
        settingsBackgroundSubTitle.textContent = 'Фон';
        settingsTagsSubTitle.textContent = 'Теги';
        settingsHiddenSubTitle.textContent = 'Отобразить';
        languageButtonEN.previousElementSibling.textContent = 'Английский';
        languageButtonRU.previousElementSibling.textContent = 'Русский';
        tagsBtnTimeOfDay.previousElementSibling.textContent = 'Час дня';
        tagsBtnSport.previousElementSibling.textContent = 'Спорт';
        tagsBtnScience.previousElementSibling.textContent = 'Наука';
        playerBtnHidden.previousElementSibling.textContent = 'Плеер';
        quotesBtnHidden.previousElementSibling.textContent = 'Цитаты';
        weatherBtnHidden.previousElementSibling.textContent = 'Погода';
        timeBtnHidden.previousElementSibling.textContent = 'Время';
        dateBtnHidden.previousElementSibling.textContent = 'Дата';
        greetingBtnHidden.previousElementSibling.textContent = 'Салют';
    }
}

export { language, updateSettings, backgroundSource, tagActive };