import React, { useState, useEffect } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../quote-banner/quoteBanner';
import QuoteVotingBox from '../quote-voting-box/quoteVotingBox';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "../main/main.scss"

const Main: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(new Quote());
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);
  const [visitorId, setVisitorId] = useState<string>("");
  const baseURL: string = "http://localhost:5000";

  useEffect(() => {
    // get data
    fetch(`${baseURL}/getquotes`)
      .then(response => response.json())
      .then((x: Quote[]) => {
        setQuotes(x);
        console.log(x);
      });
  }, []);

  useEffect(() => {
    // get visitor id
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorId(result.visitorId);
      });
  }, []);

  useEffect(() => {
    let randomQuote = getRandomQuote(allQuotes as Quote[]);
    setCurrentQuote(randomQuote as Quote);

  }, [allQuotes]);


  const handleVote = (ratingId: string) => {
    if (currentQuote.id) {
      vote(currentQuote.id, visitorId, ratingId).then(resp => {
        console.log(resp);
        setCurrentQuote(resp as Quote);
      });
    }
  }

  const getQuoteById = (quoteId: any) => {
    return fetch(`${baseURL}/quotes/${quoteId}`)
      .then(response => response.json())
  }

  const getRandomQuote = (quotes: Quote[]) => {
    return (quotes) ? quotes[Math.floor(Math.random() * (quotes.length - 1))] : null;
  }

  const setQuotes = (quotes: Quote[]): void => {
    setAllQuotes(quotes);
  }

  const vote = (quoteId: string, userId: string, voteOptionId: string): Promise<Response> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, vote: voteOptionId })
    };
    return fetch(`${baseURL}/quotes/${quoteId}`, requestOptions).then(response => response.json());
  }

  return (
    <div className='container'>
      <QuoteBanner quote={currentQuote?.quote!} />
      <QuoteVotingBox onClick={handleVote} rating={currentQuote?.rating} visitorId={visitorId}/>
    </div>
  )

}

export default Main;