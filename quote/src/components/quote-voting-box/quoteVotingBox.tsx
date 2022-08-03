import { Grid, Stack } from '@mui/material';
import React from 'react';
import { BiLaugh } from 'react-icons/bi';
import { FaQuestion } from 'react-icons/fa';
import { GiTeamIdea } from 'react-icons/gi';
import { ImSleepy } from 'react-icons/im';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { QuoteRating } from '../../models/quoteRating';
import Button from '../button/button';
import "./quoteVotingBox.scss";


export default function QuoteVotingBox({ rating, onClick, visitorId }: any) {

    const rated = (rating: QuoteRating, visitorId: string) => {
        return rating.voters?.find(x => x === visitorId) ? true : false;
    }

    return (
        <TransitionGroup>
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }}>
                {rating?.map((rating: QuoteRating) => {
                    <Grid item className="vote-option">
                        <Button id={rating.id!} border='none' icon={rating.icon} color={rating.color!} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                    </Grid>

                    // switch (rating.id) {
                    //     case "AAA":
                    //         <Grid item className="vote-option">
                    //             <Button id={rating.id} border='none' icon={(<ImSleepy color="#c9ccd6" fontSize="30px" />)} color={'#F1F2F6'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                    //         </Grid>

                    //     case "BBB":
                    //         <Grid item key={rating.id} className="vote-option">
                    //             <Button id={rating.id} border='none' icon={(<FaQuestion color="#9D85FF" fontSize="30px" />)} color={'#EFEBFF'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                    //         </Grid>
                    //     case "CCC":
                    //         <Grid item key={rating.id} className="vote-option">
                    //             <Button id={rating.id} border='none' icon={(<BiLaugh color="#69B59E" fontSize="30px" />)} color={'#D6EBE5'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                    //         </Grid>
                    //     case "DDD":
                    //         <Grid item key={rating.id} className="vote-option">
                    //             <Button id={rating.id} border='none' icon={(<GiTeamIdea color="#FAC94C" fontSize="30px" />)} color={'#FEF3D7'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                    //         </Grid>
                    //     default:
                    //         break;
                    // }
                })}

            </Grid>
        </TransitionGroup>
    );
}
