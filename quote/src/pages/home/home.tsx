import React, { useState, useEffect } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../../components/quote-banner/quoteBanner';
import Stats from '../../components/stats/stats';
import QuoteVotingBox from '../../components/quote-voting-box/quoteVotingBox';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./home.scss"
import { doRequest, getAllBasicQuotes, vote } from '../../utils/utils';
import NavigationBar from '../../components/navigationBar/navigationBar';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { LinearProgress } from '@mui/material';

const Home: React.FC = () => {

  const [visitorId, setVisitorId] = useState<string>("");
  const [currentQuote, setCurrentQuote] = useState<Quote>({ rating: [] });

  const [timerValue, setTimerValue] = useState(1);

  type SimpleQuote = { id: string, selected: boolean, hasVoted: boolean };
  const [allSimpleQuotes, setAllSimpleQuotes] = useState<SimpleQuote[]>();
  const [selectedSimpleQuoteId, setSelectedSimpleQuoteId] = useState<string>();

  useEffect(() => {
    // get visitor id
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorId(result.visitorId);
      });
  }, []);

  useUpdateEffect(() => {
    getAllBasicQuotes(visitorId).then((quotes: SimpleQuote[]) => {
      quotes.forEach(quote => quote.selected = false);
      setAllSimpleQuotes(prev => quotes.sort((a, b) => Number(a.id) - Number(b.id)));
    }).then(x => {
      if(allSimpleQuotes){
        setSelectedSimpleQuoteId(prev => allSimpleQuotes[Math.floor(Math.random() * allSimpleQuotes.length)].id);
      }
    });
  }, [visitorId])

  const handleVote = (ratingId: string) => {
    if (currentQuote?.id) {
      vote(currentQuote.id, ratingId, visitorId).then(resp => {
        let savedQuote = (resp as Quote);
        setCurrentQuote(prevQuote => savedQuote);
        if (allSimpleQuotes) {
          const newSimpleQuotes = allSimpleQuotes.map(sq => {
            if (sq.id === savedQuote.id) {
              return { ...sq, hasVoted: true };
            }
            else {
              return { ...sq };
            }
          });
          setAllSimpleQuotes(prev => newSimpleQuotes);
        }
      });
    }
  }

  function updateSelectedQuoteInArray(quoteId: string) {
    if (allSimpleQuotes) {
      const newSimpleQuotes = allSimpleQuotes.map(sq => {
        if (sq.id === quoteId) {
          return { ...sq, selected: true };
        }
        else {
          return { ...sq, selected: false };
        }
      });
      setAllSimpleQuotes(newSimpleQuotes);
    }
  }

  const handleSelectQuote = (quoteId: string) => {
    if (quoteId) {
      setSelectedSimpleQuoteId(prev => allSimpleQuotes?.find(x => x.id === quoteId)?.id);
    }
  }

  useEffect(() => {
    console.log("Getting data for selected quote");
    if(selectedSimpleQuoteId){
      doRequest(`/quotes/${selectedSimpleQuoteId}`, "GET").then(resp => {
        if (allSimpleQuotes) {
          updateSelectedQuoteInArray(selectedSimpleQuoteId);
        }
        setCurrentQuote(resp as Quote);
      })
    }
  }, [selectedSimpleQuoteId]);

  return (
    <div className='main-container'>
      <LinearProgress variant="determinate" value={timerValue} />
      <NavigationBar quotes={allSimpleQuotes!} clickHandler={handleSelectQuote} selectedQuoteId={currentQuote.id}></NavigationBar>
      <QuoteBanner quote={currentQuote?.quote!} />
      <QuoteVotingBox onClick={handleVote} rating={currentQuote.rating} visitorId={visitorId} />
      <div className='rating-overview'>
        <Stats rating={currentQuote?.rating} />
      </div>
    </div>
  )
}

export default Home;