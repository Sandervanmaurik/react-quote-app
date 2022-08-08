import { Grid, Stack } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { QuoteRating } from '../../models/quoteRating';
import Button from '../Button/Button';
import "./QuoteVotingBox.scss";

type props = {
    rating: QuoteRating[];
    onClick: (ratingId: string | undefined) => void;
    visitorId: string;
}

const QuoteVotingBox = React.memo(({ rating, onClick, visitorId }: props) => {
    function getRated(rating: QuoteRating, visitorId: string){
        return rating.voters?.find(x => x === visitorId) ? true : false;
    }

    if (!rating || rating.length == 0) {
        return <></>;
    }

    return (
        <Grid container justifyContent="center" alignItems="center" direction="row" spacing={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }}>
            {rating?.map((rating: QuoteRating) => {
                return (<Grid item key={rating.id} className="vote-option">
                    <Button id={rating.id!} border='none' iconName={rating?.icon!} color={rating.color!} iconColor={rating.iconColor!} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={getRated(rating, visitorId)}></Button>
                </Grid>)
            })}
        </Grid>
    );
})

export default QuoteVotingBox;
