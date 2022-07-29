import React from 'react';
import { BiLaugh } from 'react-icons/bi';
import { FaQuestion } from 'react-icons/fa';
import { GiTeamIdea } from 'react-icons/gi';
import { ImSleepy } from 'react-icons/im';
import { QuoteRating } from '../../models/quoteRating';
import Button from '../button/button';
import "./quoteVotingBox.scss";


export default function QuoteVotingBox({ rating, onClick, visitorId }: any) {

    const rated = (rating: QuoteRating, visitorId: string) => {
        return rating.voters?.find(x => x === visitorId) ?  true: false;
    }

    return (
        <div className='quote-vote-box'>
            {rating?.map((rating: QuoteRating) => {
                switch (rating.id) {
                    case "AAA":
                        return (<div key={rating.id} className="vote-option">
                            <Button id={rating.id} border='none' icon={(<ImSleepy color="#c9ccd6" fontSize="30px" />)} color={'#F1F2F6'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                        </div>)
                    case "BBB":
                        return (<div key={rating.id} className="vote-option">
                            <Button id={rating.id} border='none' icon={(<FaQuestion color="#9D85FF" fontSize="30px" />)} color={'#EFEBFF'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                        </div>)
                    case "CCC":
                        return (<div key={rating.id} className="vote-option">
                            <Button id={rating.id} border='none' icon={(<BiLaugh color="#69B59E" fontSize="30px" />)} color={'#D6EBE5'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                        </div>)
                    case "DDD":
                        return (<div key={rating.id} className="vote-option">
                            <Button id={rating.id} border='none' icon={(<GiTeamIdea color="#FAC94C" fontSize="30px" />)} color={'#FEF3D7'} height='80%' onClick={() => onClick(rating.id)} radius='10px' width='175px' text={rating.name!} isActive={rated(rating, visitorId)}></Button>
                        </div>)
                    default:
                        break;
                }
            })}
        </div>
    );
}
