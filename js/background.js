import {getTimeOfDay, backgroundSource, tagActive} from './script.js';
export {setBgGH, getRandomNum, setBgUnsplash, setBgFlickr};

let randomNum = "";
const nextSlideButton = document.querySelector('.slide-next');
const prevSlideButton = document.querySelector('.slide-prev');


if (backgroundSource === 'github_bcg') {
    setBgGH(getTimeOfDay(), getRandomNum(1, 20));
} else if (backgroundSource === 'unsplash_bcg') {
    setBgUnsplash(tagActive);
} else if (backgroundSource === 'flickr_bcg') {
    setBgFlickr(tagActive);
}

nextSlideButton.addEventListener('click', getSlideNext);
prevSlideButton.addEventListener('click', getSlidePrev);


function getRandomNum(min, max) {
    randomNum = Math.floor(Math.random() * (max - min) + min).toString().padStart(2, "0");
    return randomNum;
}

function setBgGH(timeofday, bgNum) {
    let link = `../assets/img/${timeofday}/${bgNum}.webp`;
    const img = new Image();
    img.src = link; 
    img.onload = () => {      
        document.body.style.backgroundImage = `url(${link})`;
    };
}
function setBgUnsplash(value) {
    if (value == 'timeofday') { value = getTimeOfDay() };
    const url = `https://api.unsplash.com/photos/random?query=${value}&client_id=iN8GQGKfTa4b6a7_AwHMEC1IZCP1y2Jo7Gz4B5gcVZo`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const img = new Image();
        img.src = data.urls.regular; 
        img.onload = () => {      
            document.body.style.backgroundImage = `url(${data.urls.regular})`;
        };
      });
}
async function setBgFlickr(value) {
    if (value == 'timeofday') { value = getTimeOfDay() };
    const urlFlickr = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b9e2ba8520d6cc0c72395689dde07cbc&tags=${value}&extras=url_h&format=json&nojsoncallback=1`;
    const resFlickr = await fetch(urlFlickr);
    const dataFlickr = await resFlickr.json();
    const img = new Image();
    let link = dataFlickr.photos.photo[getRandomNum(0, dataFlickr.photos.photo.length - 10)].url_h;
    if (link == undefined) setBgFlickr(value);
    img.src = `${link}`;
    img.onload = () => {      
        document.body.style.backgroundImage = `url(${img.src})`;
    };
}

function getSlideNext() {
    if (backgroundSource === 'github_bcg') {
        randomNum = +randomNum + 1;
        if (randomNum >= 21) randomNum = 1;
        randomNum = randomNum.toString().padStart(2, "0");
        setBgGH(getTimeOfDay(), randomNum);
    } else if (backgroundSource === 'unsplash_bcg') {
        setBgUnsplash(tagActive);
    } else if (backgroundSource === 'flickr_bcg') {
        setBgFlickr(tagActive);
    }
}

function getSlidePrev() {
    if (backgroundSource === 'github_bcg') {
        randomNum = +randomNum - 1;
        if (randomNum <= 0) randomNum = 20;
        randomNum = randomNum.toString().padStart(2, "0");
        setBgGH(getTimeOfDay(), randomNum);
    } else if (backgroundSource === 'unsplash_bcg') {
        setBgUnsplash(tagActive);
    } else if (backgroundSource === 'flickr_bcg') {
        setBgFlickr(tagActive);
    }
}