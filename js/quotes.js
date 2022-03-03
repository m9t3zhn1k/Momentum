import { language } from './settings.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonChangeQuote = document.querySelector('.change-quote');

buttonChangeQuote.addEventListener('click', getQuotes);

async function getQuotes() {  
    let quotes = language === 'en'? './json/quotes.json' : './json/quotes_ru.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let numberOfQuote = Math.floor(Math.random() * data.length);
    author.textContent = data[numberOfQuote].author;
    quote.textContent = data[numberOfQuote].quote;
}

getQuotes();

export {getQuotes};