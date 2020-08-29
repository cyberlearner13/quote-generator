const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    const { quoteAuthor, quoteText } = data;
    // If author is blank, add 'Unknown
    quoteAuthor === ''
      ? (authorText.innerText = 'Unknown')
      : (authorText.innerText = quoteAuthor);

    // Reduce font-size for long quotes
    quoteText.length > 120
      ? quote.classList.add('long-quote')
      : quote.classList.remove('long-quote');

    quote.innerText = quoteText;
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

//Twitter Functions
function tweetQuote() {
  const _quote = quote.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${_quote} - ${author}`;
  window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//Onload
getQuote();
