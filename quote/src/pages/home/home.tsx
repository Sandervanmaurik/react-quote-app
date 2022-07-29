import React, { useState, useEffect } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../../components/quote-banner/quoteBanner';
import Stats from '../../components/stats/stats';
import QuoteVotingBox from '../../components/quote-voting-box/quoteVotingBox';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./home.scss"
import { doRequest, vote } from '../../utils/utils';

const Main: React.FC = () => {

  const [visitorId, setVisitorId] = useState<string>("");
  const [currentQuote, setCurrentQuote] = useState<Quote>({rating :[]});

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
    <div className='main-container'>
      <QuoteBanner quote={currentQuote?.quote!} />
      <QuoteVotingBox onClick={handleVote} rating={currentQuote?.rating} visitorId={visitorId} />
      <div className='rating-overview'>
        <Stats rating={currentQuote?.rating} />
      </div>
    </div>
  )
}

export default Main;