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
import useInterval from '../../hooks/useInterval';

const Home: React.FC = () => {

  const [visitorId, setVisitorId] = useState<string>("");
  const [currentQuote, setCurrentQuote] = useState<Quote>({ rating: [] });

  const [timePassed, setTimePassed] = useState(0);

  // const [clear, reset] = useInterval(() => { setTimePassed(prev => prev + 1) }, 300);
  type SimpleQuote = { id: string, selected: boolean, hasVoted: boolean };
  const [allSimpleQuotes, setAllSimpleQuotes] = useState<SimpleQuote[]>();
  const [selectedSimpleQuoteId, setSelectedSimpleQuoteId] = useState<string>();


  const intervalAction = () => {
    console.log("update");
    setTimePassed(prev => prev + 1);
  };

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
      if (allSimpleQuotes) {
        setSelectedSimpleQuoteId(prev => allSimpleQuotes[Math.floor(Math.random() * allSimpleQuotes.length)].id);
      }
    });
  }, [visitorId])

  useUpdateEffect(() => {
    if (selectedSimpleQuoteId) {
      doRequest(`/quotes/${selectedSimpleQuoteId}`, "GET").then(resp => {
        if (allSimpleQuotes) {
          updateSelectedQuoteInArray(selectedSimpleQuoteId);
        }
        setCurrentQuote(resp as Quote);
      });
    }
  }, [selectedSimpleQuoteId]);

  useUpdateEffect(() => {
    // clearInterval();
    // const x = setInterval(() => {
    //   intervalAction()
    // }, 1000);
    // return clearInterval(x);
    // setTimerInterval(prev=> setInterval(() => {
    //   console.log("current changed");
    // }, 1000));
  }, [currentQuote])




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


  return (
    <div className='main-container'>
      <LinearProgress variant="determinate" value={timePassed} />
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