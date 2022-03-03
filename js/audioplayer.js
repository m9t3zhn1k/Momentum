import { playList } from './script.js';
export { playAudio, addPlayItem };

const audio = new Audio();
const playBtn = document.querySelector('.player-controls > .play');
const playPrevBtn = document.querySelector('.player-controls > .play-prev');
const playNextBtn = document.querySelector('.player-controls > .play-next');
const playListContainer = document.querySelector('.play-list');
const trackName = document.querySelector('.track__name');
const trackTime = document.querySelector('.track__time');
const volumeBtn = document.getElementById('volume');
const trackTimelength = document.querySelector('.track__timelength');
const trackVolumelength = document.querySelector('.track__volumelength');
let isPlay = false;
let playNum = 0;
let volumeLevel = 0.5;

trackTimelength.style.background = `linear-gradient(to right, #710707 0%, #710707 ${trackTimelength.value}%, #999999 ${trackTimelength.value}%, #999999 100%)`;
trackVolumelength.style.background = `linear-gradient(to right, #710707 0%, #710707 ${trackVolumelength.value*100}%, #999999 ${trackVolumelength.value*100}%, #999999 100%)`;
playList.forEach(track => addPlayItem(track));

audio.addEventListener('timeupdate', getTimeTrack);
audio.addEventListener('timeupdate', setTimelength);
playBtn.addEventListener('click', playAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
audio.addEventListener('ended', end);
window.addEventListener('load', getTrack);
volumeBtn.addEventListener('click', setMute);
trackTimelength.addEventListener('click', scrub);
trackTimelength.addEventListener('input', handleTimelength);
trackVolumelength.addEventListener('input', setVolumelength);
playListContainer.addEventListener('click', checkAudio);

function getTrack() {
    trackName.textContent = playList[playNum].title;
    trackTime.textContent = `00:00 / ${playList[playNum].duration}`;
}
function getTimeTrack() {
    let m = Math.floor((audio.currentTime / 60) % 60);
    if (m < 10) m = '0' + m;
    let s = Math.floor(audio.currentTime % 60);
    if (s < 10) s = '0' + s;
    let time = `${m}:${s}`;
    trackTime.textContent = `${time} / ${playList[playNum].duration}`;
}
function end() {
    playNext();
}
function setMute() {
    if (trackVolumelength.value > 0) {
        volumeLevel = trackVolumelength.value;
        trackVolumelength.value = 0;
    } else if (trackVolumelength.value == 0) {
        trackVolumelength.value = volumeLevel;
    }
    volumeBtn.classList.toggle('mute');
    setVolumelength();
}
function playAudio() {
    for (let item of playListContainer.childNodes) {
        if (item == playListContainer.childNodes[playNum]) {
            item.classList.add('item-active');
            item.classList.add('mute');
            item.style.opacity = '1';
        } else {
            item.classList.remove('item-active');
            item.classList.remove('mute');
            item.style.opacity = '0.8';
        }
    }
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.volume = trackVolumelength.value;
    trackTimelength.value = audio.currentTime;
    if (!isPlay) {
        audio.play();
        isPlay = true;
        togglePlayBtn();
    } else {
        audio.pause();
        isPlay = false;
        togglePlayBtn();
    }
    handleTimelength();
}
function checkAudio(event) {
    let target = event.target
    for (let i = 0; i < playListContainer.childNodes.length; i++) {
        if (target == playListContainer.childNodes[i]) {
            playNum = i;
            playAudio();
            getTrack();
            break;
        }
    }
}

function togglePlayBtn() {
    if (!isPlay) {
        playBtn.classList.remove('pause');
        for (let item of playListContainer.childNodes) {
                item.classList.remove('mute');
        }
    } else {
        playBtn.classList.add('pause');
    }
}

function playNext() {
    playNum++;
    if (playNum > playList.length - 1) {
        playNum = 0;
    }
    isPlay = false;
    playAudio();
    getTrack();
}

function playPrev() {
    playNum--;
    if (playNum < 0) {
        playNum = playList.length - 1;
    }
    isPlay = false;
    playAudio();
    getTrack();
}

function addPlayItem(obj) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${obj.title}`;
    playListContainer.append(li);
}
function setTimelength() {
    trackTimelength.value = audio.currentTime / audio.duration*100;
    if (isNaN(audio.duration)) {
        trackTimelength.value = 0;
    }
    handleTimelength();
}

function handleTimelength() {
    const value = trackTimelength.value;
    trackTimelength.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #999999 ${value}%, #999999 100%)`;
}
function scrub(e) {
    let timelineWidth = getComputedStyle(trackTimelength);
    const scrubTime = (e.offsetX / parseInt(timelineWidth.width)) * audio.duration;
    audio.currentTime = scrubTime;
}
function setVolumelength() {
    const value = trackVolumelength.value;
    trackVolumelength.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value*100}%, #999999 ${value*100}%, #999999 100%)`;
    audio.volume = trackVolumelength.value;
    if (trackVolumelength.value == 0) {
        volumeBtn.classList.add('mute');
    };
    if (trackVolumelength.value > 0) {
        volumeBtn.classList.remove('mute');
    };
}