import React, { useState, useEffect } from 'react';
import { Quote } from '../../models/quote';
import QuoteVotingBox from '../quote-voting-box/quoteVotingBox';


function Main() {
  const [currentQuote, setCurrentQuote] = useState(new Quote());
  const [allQuotes, setAllQuotes] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/getquotes')
      .then(response => response.json())
      .then(x => {
        console.log(x);
        setAllQuotes(x);
        let randomQuote = getRandomQuote(allQuotes);
        setCurrentQuote(randomQuote as Quote);  
        console.log(randomQuote);
      });   

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <>
      <div className='quote-banner'>
        <span className='quote-text'></span>
      </div>
      <QuoteVotingBox />
    </>
  )
}
function getRandomQuote(quotes: Quote[]) {
  console.log(quotes);
  return (quotes) ? quotes[Math.floor(Math.random() * (quotes.length - 1))] : null;
}
export default Main;