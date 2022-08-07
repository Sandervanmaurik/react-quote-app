import React, { useState, useEffect, useContext } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../../components/quote-banner/quoteBanner';
import Stats from '../../components/stats/stats';
import QuoteVotingBox from '../../components/quote-voting-box/quoteVotingBox';
import "./home.scss"
import { doRequest, getAllBasicQuotes, vote } from '../../utils/utils';
import NavigationBar from '../../components/navigationBar/navigationBar';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { LinearProgress } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from "../../utils/errorHandler";
import { useVisitor } from '../../contexts/visitorContext';
import handleError from '../../utils/errorHandler';
import LoadingCircle from '../../components/loadingCircle/loadingCircle';

const Home: React.FC = () => {
  type SimpleQuote = { id: string, hasVoted: boolean };

  const [currentQuote, setCurrentQuote] = useState<Quote>({ id: "", rating: [], quote: '', author: '' });
  const [allSimpleQuotes, setAllSimpleQuotes] = useState<SimpleQuote[]>([]);
  const [selectedSimpleQuoteId, setSelectedSimpleQuoteId] = useState<string>();
  const [timePassed, setTimePassed] = useState(0);
  const timerMaxValueInSeconds = 10;
  const [pageLoading, setPageLoading] = useState(true);

  const { visitorId, isLoading } = useVisitor();

  useUpdateEffect(() => {
    console.log(pageLoading);
    // Get all simple quotes on visitorId change;
    // Set current selectedSimpleQuote to random unvoted quote from this list;
    getAllBasicQuotes(visitorId).then((quotes: SimpleQuote[]) => {
      if (quotes) {
        setAllSimpleQuotes(prev => quotes.sort((a, b) => Number(a.id) - Number(b.id)));
      }
    }, err => handleError(err));
  }, [visitorId])

  useUpdateEffect(() => {
    if (allSimpleQuotes.length === 0) return;
    setSelectedSimpleQuoteId(prev => {
      return getRandomUnvotedQuote(prev, allSimpleQuotes).id

    });
  }, [allSimpleQuotes.length])

  useUpdateEffect(() => {
    // Get data for currently selected quote
    if (selectedSimpleQuoteId) {
      doRequest(`/quotes/${selectedSimpleQuoteId}`, "GET").then(resp => {
        setCurrentQuote(resp as Quote);
      });
    }
  }, [selectedSimpleQuoteId]);

  useUpdateEffect(() => {
    // Set interval for progress bar when currentQuote changes
    // Reset interval and select random unvoted quote if time runs out
    if (!currentQuote.id) return;
    const currentInterval = setInterval(() => {
      setTimePassed(prev => {
        if (prev < timerMaxValueInSeconds + 0.2) {
          return prev + 0.1;
        }
        setSelectedSimpleQuoteId(prev => getRandomUnvotedQuote(prev, allSimpleQuotes).id);
        return 0;
      });
    }, 100);
    return () => { clearInterval(currentInterval); setTimePassed(prev => 0) };
  }, [currentQuote.id])


  function handleVote(ratingId: string) {
    // Vote for currentQuote with given ratingId
    // Set currentQuote to response of the vote;
    if (currentQuote.id) {
      vote(currentQuote.id, ratingId, visitorId).then(resp => {
        let savedQuote = (resp as Quote);
        setCurrentQuote(prevQuote => savedQuote);
        // Update list of simpleQuotes to show user has voted without extra get request
        const newSimpleQuotes = allSimpleQuotes.map(sq => {
          if (sq.id === savedQuote.id) {
            return { ...sq, hasVoted: true };
          }
          else {
            return { ...sq };
          }
        });
        setAllSimpleQuotes(prev => newSimpleQuotes);
      }, err => {
        console.log("something went wrong");
      });
    }
  }

  function handleSelectQuote(quoteId: string) {
    setSelectedSimpleQuoteId(prev => allSimpleQuotes?.find(x => x.id === quoteId)?.id);

  }

  function calculatePercentage(value: number) {
    return value / timerMaxValueInSeconds * 100;
  }

  function getRandomUnvotedQuote(currentQuoteId: string | undefined, simpleQuotesList: SimpleQuote[]): SimpleQuote {
    let unvotedQuotes = simpleQuotesList.filter(x => x.hasVoted === false && x.id !== currentQuoteId);
    if (unvotedQuotes.length === 0) {
      unvotedQuotes = simpleQuotesList.filter(x => x.hasVoted === false && x.id);
    }
    let toReturn = (unvotedQuotes.length > 0) ? unvotedQuotes[Math.floor(Math.random() * unvotedQuotes.length)] : simpleQuotesList[Math.floor(Math.random() * simpleQuotesList.length)];
    setPageLoading(false);
    return (toReturn) ? toReturn : simpleQuotesList[0];
  }

  function content() {
    if (pageLoading) {
      return <div className="loading-wrapper">
        <LoadingCircle color='primary' width="100px" height="100px" ></LoadingCircle>
        </div>
    }
    else {
      return (
        <div className='main-container'>
          <LinearProgress variant="determinate" value={calculatePercentage(timePassed)} className="progress-bar" />
          <NavigationBar quotes={allSimpleQuotes} clickHandler={handleSelectQuote} selectedQuoteId={currentQuote.id}></NavigationBar>
          <QuoteBanner quote={currentQuote.quote} />
          <QuoteVotingBox onClick={handleVote} rating={currentQuote.rating} visitorId={visitorId} />
          <div className='rating-overview'>
            <Stats rating={currentQuote?.rating} />
          </div>
        </div>
      )
    }
  }

  return content();

}

export default Home;