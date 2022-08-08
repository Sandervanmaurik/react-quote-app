import { Grid, Stack } from '@mui/material';
import React from 'react';
import { BiLaugh } from 'react-icons/bi';
import { FaQuestion } from 'react-icons/fa';
import { GiTeamIdea } from 'react-icons/gi';
import { ImSleepy } from 'react-icons/im';
import { QuoteRating } from '../../models/quoteRating';
import Button from '../button/button';
import LoadingCircle from '../loadingCircle/loadingCircle';
import "./quoteVotingBox.scss";

type props = {
    rating: QuoteRating[];
    onClick: (ratingId: string | undefined) => void;
    visitorId: string;
}

export default function QuoteVotingBox({ rating, onClick, visitorId }: props) {
    const rated = (rating: QuoteRating, visitorId: string) => {
        return rating.voters?.find(x => x === visitorId) ? true : false;
    }

    function getJsxIcon(name?: string): JSX.Element {
        switch (name) {
            case "sleepy":
                return (<ImSleepy color="#c9ccd6" fontSize="30px" />);
            case "questionMark":
                return (<FaQuestion color="#9D85FF" fontSize="30px" />);
            case "laugh":
                return (<BiLaugh color="#69B59E" fontSize="30px" />);
            case "idea":
                return (<GiTeamIdea color="#FAC94C" fontSize="30px" />);
            default:
                return (<div></div>);
        }
    }

    if (!rating || rating.length == 0) {
        return <></>;
    }

    return (
        <Grid container justifyContent="center" alignItems="center" direction="row" spacing={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }}>
            {rating?.map((rating: QuoteRating) => {
                return (<Grid item key={rating.id} className="vote-option">
                    <Button id={rating.id!} border='none' icon={getJsxIcon(rating?.icon)} color={rating.color!} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                </Grid>)
            })}
        </Grid>
    );
}
