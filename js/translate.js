import { getQuotes, getWeather, isEmptyCity, showTime, isEmptyName, updateGreeting, updateSettings } from './script.js';
import { language } from './settings.js';

const greetingTranslation = {
    
}

function translateAll(lang) {
    getWeather();
    isEmptyCity();
    showTime();
    isEmptyName();
    updateGreeting();
    getQuotes();
    updateSettings();
}

export { translateAll };