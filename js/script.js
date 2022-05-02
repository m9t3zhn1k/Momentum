import { language, updateSettings, backgroundSource, tagActive } from './settings.js';
import { showTime } from './showTime, showDate.js';
import { getTimeOfDay , updateGreeting, isEmptyName } from './greeting.js';
import { setBgGH, getRandomNum, setBgUnsplash, setBgFlickr } from './background.js';
import { getWeather, isEmptyCity } from './weather.js';
import { getQuotes } from './quotes.js';
import { playList } from './playList.js';
import { playAudio, addPlayItem } from './audioplayer.js';
import { translateAll } from './translate.js';

export { setBgGH, getRandomNum, setBgUnsplash, setBgFlickr, getQuotes, showTime, getTimeOfDay, updateGreeting, isEmptyName, translateAll, getWeather, isEmptyCity, language, backgroundSource, tagActive, updateSettings, playList };