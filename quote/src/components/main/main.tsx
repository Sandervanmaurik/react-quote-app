import React, { useState, useEffect } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../quote-banner/quoteBanner';
import QuoteVotingBox from '../quote-voting-box/quoteVotingBox';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "../main/main.scss"
import { doRequest, vote } from '../../helpers/utils';

const Main: React.FC = () => {

  const [visitorId, setVisitorId] = useState<string>("");
  const [currentQuote, setCurrentQuote] = useState<Quote>({});

  useEffect(() => {
    doRequest('/quotes/random', 'GET')
      .then((rndQuote: Quote) => {
        setCurrentQuote(quote => quote = rndQuote);
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

  const handleVote = (ratingId: string) => {
    if (currentQuote?.id) {
      vote(currentQuote.id, ratingId, visitorId).then(resp => {
        setCurrentQuote(prevQuote => resp as Quote);
      })
    }
  }

  return (
    <div className='container'>
      <QuoteBanner quote={currentQuote?.quote!} />
      <QuoteVotingBox onClick={handleVote} rating={currentQuote?.rating} visitorId={visitorId} />
    </div>
  )

}

export default Main;