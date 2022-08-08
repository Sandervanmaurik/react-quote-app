import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Quote } from '../../models/quote'
import { QuoteRating } from '../../models/quoteRating';

import "../stats/stats.scss";
export default function Stats({rating}: Quote) {
  const setCustomHeight = (toCalculate: QuoteRating ) => {
    let totalValue = 0;
    let givenValue = 0;
    if(toCalculate && toCalculate.voters){
      givenValue = toCalculate.voters.length;
    }
    for(let item of rating){
      if(item.voters) totalValue += item.voters?.length;
    }
    let toReturn = (givenValue) ? givenValue / totalValue * 100: 0;
    return (toReturn === 0) ?  "10%" : `${toReturn}%`;
  }

  if(!rating || rating.length === 0){
    return <></>
  }
  return (
    
    <Grid container justifyContent="flex-end" gap="5%"height="250px" width="250px" flexDirection="row">
        <Grid item marginTop="auto" height={setCustomHeight(rating[0])} className='noselect bar boring'><span>{rating[0]?.voters?.length}</span></Grid>
        <Grid item marginTop="auto" height={setCustomHeight(rating[1])} className='noselect bar idk'><span>{rating[1]?.voters?.length}</span></Grid>
        <Grid item marginTop="auto" height={setCustomHeight(rating[2])} className='noselect bar funny'><span>{rating[2]?.voters?.length}</span></Grid>
        <Grid item marginTop="auto" height={setCustomHeight(rating[3])} className='noselect bar inspiring'><span>{rating[3]?.voters?.length}</span></Grid>
    </Grid>
  )
}