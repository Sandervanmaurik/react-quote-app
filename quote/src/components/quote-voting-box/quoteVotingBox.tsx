import React from 'react';
import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { ImSleepy } from 'react-icons/im';
import { BiLaugh } from 'react-icons/bi';
import { GiTeamIdea } from 'react-icons/gi';

import QuoteVotingItem from '../quote-voting-item/quoteVotingItem';
import "./quoteVotingBox.scss";
export default function QuoteVotingBox() {

    interface VotingItemProps {
        id: string;
        name: string;
        color: string;
        isActive: boolean;
    }

    const [options, setOptions] = useState<VotingItemProps[]>(() => [
        { name: "Boring", id: "AAA", color: "#F1F2F6", icon: (<ImSleepy color="#c9ccd6" fontSize="30px" />), isActive: false },
        { name: "I don't get it", id: "BBB", color: "#EFEBFF", icon: (<FaQuestion color="#9D85FF" fontSize="30px" />), isActive: false },
        { name: 'Funny', id: "CCC", color: "#D6EBE5", icon: (<BiLaugh color="#69B59E" fontSize="30px" />), isActive: false },
        { name: 'Inspiring', id: "DDD", color: "#FEF3D7", icon: (<GiTeamIdea color="#FAC94C" fontSize="30px" />), isActive: false }]);

    const handleVote = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newOptions = options.map(obj => {
            if (obj.id === event.currentTarget.id) {
                return { ...obj, isActive: true};
            }
            else{
                return {...obj, isActive: false};
            }
        });
        setOptions(newOptions);
    }


    return (
        <div className='quote-vote-box'>
            {options.map(option => {
                return <QuoteVotingItem key={option.id} props={option} onClick={handleVote}></QuoteVotingItem>
            })}
        </div>
    );
}
