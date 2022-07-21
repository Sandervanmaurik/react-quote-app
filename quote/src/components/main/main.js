import React, { useState, useEffect } from 'react';
import QuoteVotingBox from '../quote-voting-box/quoteVotingBox.js';


function Main() {
  const [currentQuote, setCurrentQuote] = useState("Test");
  const [allQuotes, setAllQuotes] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/getquotes')
      .then(response => response.json())
      .then(x => {
        console.log(x);
        setAllQuotes(x);
        let randomQuote = getRandomQuote(allQuotes);
        setCurrentQuote(randomQuote);  
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
export function getRandomQuote(quotes) {
  console.log(quotes);
  return (quotes) ? quotes[Math.floor(Math.random() * quotes.length)] : null;
}
export default Main;