import React from 'react';
import { BiLaugh } from 'react-icons/bi';
import { FaQuestion } from 'react-icons/fa';
import { GiTeamIdea } from 'react-icons/gi';
import { ImSleepy } from 'react-icons/im';
import { QuoteRating } from '../../models/quoteRating';
import QuoteVotingItem from '../quote-voting-item/quoteVotingItem';
import "./quoteVotingBox.scss";


export default function QuoteVotingBox({ rating, onClick, visitorId }: any) {

    const rated = (rating: QuoteRating, visitorId: string) => {
        if (rating.voters?.find(x => x === visitorId)) return true;
        return false;
    }

    return (
        <div className='quote-vote-box'>
            {rating?.map((rating: QuoteRating) => {
                switch (rating.id) {
                    case "AAA":
                        return <QuoteVotingItem key={rating.id} rating={rating} onClick={() => onClick(rating.id)} color="#F1F2F6" icon={(<ImSleepy color="#c9ccd6" fontSize="30px" />)} isActive={rated(rating, visitorId)}></QuoteVotingItem>
                    case "BBB":
                        return <QuoteVotingItem key={rating.id} rating={rating} onClick={() => onClick(rating.id)} color="#EFEBFF" icon={(<FaQuestion color="#9D85FF" fontSize="30px" />)} isActive={rated(rating, visitorId)}></QuoteVotingItem>
                    case "CCC":
                        return <QuoteVotingItem key={rating.id} rating={rating} onClick={() => onClick(rating.id)} color="#D6EBE5" icon={(<BiLaugh color="#69B59E" fontSize="30px" />)} isActive={rated(rating, visitorId)}></QuoteVotingItem>
                    case "DDD":
                        return <QuoteVotingItem key={rating.id} rating={rating} onClick={() => onClick(rating.id)} color="#FEF3D7" icon={(<GiTeamIdea color="#FAC94C" fontSize="30px" />)} isActive={rated(rating, visitorId)}></QuoteVotingItem>
                    default:
                        break;
                }
            })}
        </div>
    );
}
