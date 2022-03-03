import { language } from './script.js';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const nameCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', getWeather);
nameCity.addEventListener('change', getWeather);
nameCity.addEventListener('change', isEmptyCity);

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity.value}&lang=${language}&appid=9c8828a9220dfcf03e9c23991dbf1e99&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (language === 'ru') {
        if (data.cod === 200) {
            windSpeed.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;
        } else if (data.cod === '404') {
            weatherError.textContent = 'Город не найден. Введите правильное название!';

        } else if (data.cod === '400') {
            weatherError.textContent = 'Название города пустое. Введите правильное название!';
        }
    }
    if (language === 'en') {
        if (data.cod === 200) {
            windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
        } else if (data.cod === '404') {
            weatherError.textContent = 'City not found. Enter correct city!';
        } else if (data.cod === '400') {
            weatherError.textContent = 'City is empty. Enter correct city!';
        }
    }
    if (data.cod === 200) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherError.textContent = '';
    } else if (data.cod === '404') {
        weatherError.style.color = '#ff0000';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = ``;
        windSpeed.textContent = ``;
        humidity.textContent = ``;
    } else if (data.cod === '400') {
        weatherError.style.color = '#ff0000';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = ``;
        windSpeed.textContent = ``;
        humidity.textContent = ``;
    }
}

function setLocalStorage() {
    localStorage.setItem('city', nameCity.value);
}

function getLocalStorage() {
    if(localStorage.getItem('city')) {
        nameCity.value = localStorage.getItem('city');
    } else if (language === 'en') {
        nameCity.value = 'Minsk';
    } else nameCity.value = 'Минск';
}

function isEmptyCity() {
    if (!nameCity.value && language === 'en') {
        nameCity.placeholder = '[Enter city]';
    } else if (!nameCity.value && language === 'ru') {
        nameCity.placeholder = '[Введите город]';
    }
}

export {getWeather, isEmptyCity};