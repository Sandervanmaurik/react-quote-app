import React, { useState } from 'react';
import { Quote } from '../../models/quote';
import QuoteBanner from '../../components/quote-banner/quoteBanner';
import Stats from '../../components/stats/stats';
import QuoteVotingBox from '../../components/quote-voting-box/quoteVotingBox';
import "./home.scss"
import { getAllBasicQuotes, getQuoteById, vote } from '../../utils/utils';
import NavigationBar from '../../components/navigationBar/navigationBar';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { Alert, LinearProgress, Slide, Snackbar } from '@mui/material';
import { useVisitor } from '../../contexts/visitorContext';
const Home: React.FC = () => {
  type SimpleQuote = { id: string, hasVoted: boolean };

  const [currentQuote, setCurrentQuote] = useState<Quote>({ id: "", rating: [], quote: '', author: '' });
  const [allSimpleQuotes, setAllSimpleQuotes] = useState<SimpleQuote[]>([]);
  const [selectedSimpleQuoteId, setSelectedSimpleQuoteId] = useState<string>();
  const [timePassed, setTimePassed] = useState<number>(-1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [successActionPerformed, setSuccesActionPerformed] = useState<boolean>(false);
  const timerMaxValueInSeconds = 10;

  const { visitorId, visitorLoading } = useVisitor();

  useUpdateEffect(() => {
    // Get all simple quotes on visitorId change;
    // Set current selectedSimpleQuote to random unvoted quote from this list;
    getAllBasicQuotes(visitorId).then((quotes: SimpleQuote[]) => {
      if (quotes) {
        setAllSimpleQuotes(prev => quotes.sort((a, b) => Number(a.id) - Number(b.id)));
      }
    }).catch(err => {
      handleError(err.message);
    });
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
      getQuoteById(selectedSimpleQuoteId).then(resp => {
        setCurrentQuote(resp as Quote);
      }).catch(err => {
        handleError(err.message);
      });
    }
  }, [selectedSimpleQuoteId]);

  useUpdateEffect(() => {
    // Set interval for progress bar when currentQuote changes
    // Reset interval and select random unvoted quote if time runs out
    if (!currentQuote.id) return;
    const currentInterval = setInterval(() => {
      setTimePassed(prev => {
        if(prev === -1) return 0;
        if (prev < timerMaxValueInSeconds + 0.2) {
          return prev + 0.1;
        }
        setSelectedSimpleQuoteId(prev => getRandomUnvotedQuote(prev, allSimpleQuotes).id);
        return 0;
      });
    }, 100);
    return () => { clearInterval(currentInterval); setTimePassed(prev => 0) };
  }, [currentQuote.id])


  function handleError(errorMessage: string) {
    setErrorMessage(errorMessage);
    setHasError(true);
    console.log(errorMessage);
  }

  function handleSuccessMessage(successMessage: string){
    setSuccessMessage(successMessage);
    setSuccesActionPerformed(true);
  }


  function handleVote(ratingId: string | undefined) {
    // Vote for currentQuote with given ratingId
    // Set currentQuote to response of the vote;
    if (currentQuote.id && ratingId) {
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
        handleSuccessMessage(`Successfully voted for ${currentQuote.rating.find(rating => rating.id === ratingId)?.name}`);
        setAllSimpleQuotes(prev => newSimpleQuotes);
      }).catch(err => {
        handleError(err.message);
      });;
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
    return (toReturn) ? toReturn : simpleQuotesList[0];
  }

  return (
    <div className='main-container'>
      <LinearProgress variant="determinate" value={calculatePercentage(timePassed)} className="progress-bar" />
      <NavigationBar quotes={allSimpleQuotes} clickHandler={handleSelectQuote} selectedQuoteId={currentQuote.id}></NavigationBar>
      <QuoteBanner quote={currentQuote.quote} />
      <QuoteVotingBox onClick={handleVote} rating={currentQuote.rating} visitorId={visitorId} />
      <div className='rating-overview'>
        <Stats rating={currentQuote?.rating} />
      </div>
      <Snackbar open={hasError} autoHideDuration={4000} onClose={() => { setErrorMessage(""); setHasError(false) }}>
        <Alert severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={successActionPerformed} autoHideDuration={4000} onClose={() => { setSuccessMessage(""); setSuccesActionPerformed(false) }}>
        <Alert severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default Home;