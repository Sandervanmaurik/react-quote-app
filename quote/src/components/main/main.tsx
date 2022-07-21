import React, { useState, useEffect } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../quote-banner/quoteBanner';
import QuoteVotingBox from '../quote-voting-box/quoteVotingBox';
import "../main/main.scss"

const Main: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(new Quote());
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/getquotes')
      .then(response => response.json())
      .then(x => {
        setQuotes(x);
      });
  }, []);

  useEffect(() => {
    let randomQuote = getRandomQuote(allQuotes as Quote[]);
    setCurrentQuote(randomQuote as Quote);
  }, [allQuotes]);

  function setQuotes(quotes: Quote[]): void {
    setAllQuotes(quotes);
  }

  return (
    <div className='container'>
      <QuoteBanner quote={currentQuote?.quote!} />
      <QuoteVotingBox />
    </div>

  )
  function getRandomQuote(quotes: Quote[]) {
    return (quotes) ? quotes[Math.floor(Math.random() * (quotes.length - 1))] : null;
  }
}

export default Main;