import { Grid } from '@mui/material';
import React from 'react'
import { QuoteRating } from '../../models/quoteRating';

import "./Stats.scss";
import StatsBar from './StatsBar/StatsBar';

type props = {
  rating: QuoteRating[];
}

export default function Stats({ rating }: props) {
  const getHeight = (toCalculateRating: QuoteRating) => {
    let totalValue = 0;
    let givenValue = 0;
    if (toCalculateRating && toCalculateRating.voteCount) {
      givenValue = (toCalculateRating.voteCount) ? toCalculateRating.voteCount : 0;
    }
    for (let item of rating) {
      if (item.voteCount) totalValue += item.voteCount;
    }
    let toReturn = (givenValue) ? givenValue / totalValue * 100 : 0;
    return (toReturn === 0) ? "10%" : `${toReturn}%`;
  }

  if (!rating || rating.length === 0) {
    return <></>
  }


  return (
    <Grid container justifyContent="flex-end" gap="5%" height="250px" width="250px" flexDirection="row">
      {rating.map((item) => {
        return <StatsBar backgroundColor={item.iconColor!} height={getHeight(item)} key={item.id} voteCount={item.voteCount!}></StatsBar>
      })}
    </Grid>
  )
}